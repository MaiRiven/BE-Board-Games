const db = require('../db/connection.js');

const fetchCommentsByReviewId = (reviewId) => {
    return db
        .query(
        `SELECT * FROM comments WHERE comments.review_id = $1
        ORDER BY comments.votes DESC;`,
        [reviewId])
    .then((res) => {
        const comments = res.rows;
        return comments;
    });
};

const writeComment = ({ username, body }, reviewId) => {
    return db.query(`
        INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3)
        RETURNING *;
    `, [body, username, reviewId])
    .then((res) => {
        return res.rows[0].body;
    });
};

const eraseComment = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1
    RETURNING *`, [comment_id])
    .then(res => {
        if(!res.rowCount){
            return Promise.reject({ status: 404, msg: 'Bad request'})
        };
    });
};

const updateComment = (commentId, voteInc) => {
    return db.query(`
        UPDATE comments SET votes = votes + $1 WHERE comment_id = $2
        RETURNING *
    `, [voteInc, commentId])
    .then((res) => {
        if(!res.rowCount) {
            return Promise.reject({ status: 404, msg: 'Comment not found'});
        }
        return res.rows[0];
    });
};

module.exports = { fetchCommentsByReviewId, writeComment, eraseComment, updateComment }