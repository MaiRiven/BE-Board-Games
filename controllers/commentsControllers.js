const { fetchCommentsByReviewId, writeComment, eraseComment, updateComment } = require('../models/commentsModels.js');
const { fetchReviewById } = require('../models/reviewsModels.js');

const getCommentsByReviewId = (req, res, next) => {
    const reviewId = req.params.review_id;
    const checkArticle = fetchReviewById(reviewId);
    const fetchingComments = fetchCommentsByReviewId(reviewId);

    Promise.all([checkArticle, fetchingComments])
        .then((commentData) => {
        res.status(200).send({ comments: commentData[1] });
        })
        .catch((err) => next(err));
};

const postComment = (req, res, next) => {
    const { review_id } = req.params;
    return writeComment(req.body, review_id)
        .then((comment) => {
            res.status(201).send({comments: comment})
        })
        .catch((err) => next(err));
};

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    return eraseComment(comment_id)
        .then(() => res.status(204).send())
        .catch(err => next(err));
};

const patchComment = (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
        return updateComment(comment_id, inc_votes)
            .then((comment) => {
                res.status(200).send({ comment })
            })
            .catch((err) => next(err));
};

module.exports = { getCommentsByReviewId, postComment, deleteComment, patchComment};