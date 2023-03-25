const { fetchReviews, fetchReviewById, updateReview, removeReview, insertReview } = require('../models/reviewsModels');

const getReviews = (req, res, next) => {
    const { category, sort_by = 'created_at', order = 'desc' } = req.query;
    fetchReviews(category, sort_by, order)
        .then((reviews) => {
            res.status(200).send({ reviews });
        })
        .catch((err) => next(err));
};

const getReviewById = (req, res, next) => {
    const { review_id } = req.params
    return fetchReviewById(review_id)
        .then((review) => {
            res.status(200).send({ review });
        })
        .catch((err) => next(err));
};

const postReview = (req, res, next) => {
    insertReview(req.body)
    .then((res) => {
        return fetchReviewById(res.review_id)
    })
    .then((review) => res.status(201).send({ review }))
    .catch((err) => next(err));
};

const patchReview = (req, res, next) => {
    const { review_id } = req.params;
    const { inc_votes } = req.body;

    if (inc_votes === undefined || typeof inc_votes !== 'number') {
        return res.status(400).send({ msg: 'Invalid inc_votes value' });
    };

    return updateReview(review_id, inc_votes)
        .then((review) => {
            res.status(200).send({ review });
        })
        .catch((err) => next(err));
};

const deleteReview = (req, res, next) => {
    const { review_id } = req.params;
    return removeReview(review_id)
        .then(() => {
            res.status(204).send()
        })
        .catch((err) => next(err));
};

module.exports = { getReviews, getReviewById, patchReview, deleteReview, postReview }