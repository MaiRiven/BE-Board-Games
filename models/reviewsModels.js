const db = require('../db/connection.js');

const fetchReviews = (category, sort_by, order) => {
    const validColumns = [
        'owner', 'title', 'review_id', 'category', 'created_at',
        'votes', 'designer', 'comment_count'
    ];

    if (!validColumns.includes(sort_by)) {
        return Promise.reject({
            status: 400,
            msg: "Bad Request",
        });
    };

    const query = {
        text: `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
            reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, 
            COUNT(comments.comment_id) AS comment_count FROM reviews 
            LEFT JOIN comments ON comments.review_id = reviews.review_id
            WHERE ($1::text IS NULL OR reviews.category = $1)
            GROUP BY reviews.review_id
            ORDER BY ${sort_by} ${order};`,
        values: [category],
    };

    return db.query(query)
        .then((res) => {
            const reviewRows = res.rows;
            return reviewRows;
    });
};

const fetchReviewById = (review_id) => {
    return db
      .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
        .then((res) => {
        const review = res.rows;
        if (review.length === 0) {
            return Promise.reject({
            status: 404,
            msg: "Review not found!",
            });
        }
        const reviewWithCommentCount = Object.assign({}, review[0]);
        return db.query(`SELECT COUNT(*) FROM comments WHERE review_id = $1`, [review_id])
            .then((res) => {
            reviewWithCommentCount.comment_count = parseInt(res.rows[0].count) || 0;
            return reviewWithCommentCount;
        });
    })
};

const updateReview = (review_id, voteInc) => {
    return db.query(`UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`,
    [voteInc, review_id])
    .then(res => {
        if(!res.rowCount) {
        return Promise.reject({ status: 404, msg: 'Review not found' })
        }
        return res.rows[0]
    })
};

const insertReview = ({ owner, title, review_body, designer, category, review_img_url }) => {
    const queryParams = [owner, title, review_body, designer, category]
    let queryString = `INSERT INTO reviews (owner, title, review_body, designer, category`
    if (review_img_url) {
        queryString +=`, review_img_url`
        queryParams.push(review_img_url)
    }
    queryString += `) VALUES ($1, $2, $3, $4, $5`
    if (review_img_url) queryString += `, $6`
    queryString += `) RETURNING *`
    return db.query(queryString, queryParams).then(({ rows }) => {
        return rows[0]
    });
};

const removeReview = (reviewId) => {
    return db.query(`
        DELETE FROM reviews WHERe review_id = $1
        RETURNING *
    `, [reviewId])
        .then((res) => {
            if (!res.rowCount) {
                return Promise.reject({ status: 404, msg: "review not found" })
            }
        })
};

module.exports = { fetchReviews, fetchReviewById, updateReview, insertReview, removeReview };