const { getCommentsByReviewId, postComment } = require('../controllers/commentsControllers');
const { getReviews, getReviewById, patchReview, postReview, deleteReview } = require('../controllers/reviewsControllers');

const reviewRouter = require('express').Router();

reviewRouter.route('/')
    .get(getReviews)
    .post(postReview)

reviewRouter.route('/:review_id')
    .get(getReviewById)
    .patch(patchReview)
    .delete(deleteReview)

reviewRouter.route('/:review_id/comments')
    .get(getCommentsByReviewId)
    .post(postComment)

module.exports = reviewRouter;