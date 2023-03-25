// const {
//   fetchCategories,
//   fetchReviewById,
//   fetchReviews,
//   fetchCommentsByReviewId,
//   writeComment,
//   fetchUsers,
//   eraseComment,
//   fetchEndpoints,
//   addCategory,
//   updateComment,
//   updateReview,
//   insertReview,
//   removeReview,
//   fetchUser,
// } = require("../models/models.js");

// const getCategories = (req, res, next) => {
//   fetchCategories()
//     .then((categories) => {
//       res.status(200).send({ categories });
//     })
//     .catch((err) => next(err));
// };

// const postCategories = (req, res, next) => {
//   addCategory(req.body)
//     .then((category) => {
//       res.status(201).send({ category });
//     })
//     .catch((err) => next(err));
// };

// const getReviews = (req, res, next) => {
//   const { category, sort_by = 'created_at', order = 'desc' } = req.query;
//   fetchReviews(category, sort_by, order)
//     .then((reviews) => {
//       res.status(200).send({ reviews });
//     })
//     .catch((err) => next(err));
// };

// const getReviewById = (req, res, next) => {
//   const reviewId = req.params.review_id;
//   fetchReviewById(reviewId)
//     .then((review) => {
//       res.status(200).send({ review });
//     })
//     .catch((err) => next(err));
// };

// const getCommentsByReviewId = (req, res, next) => {
//   const reviewId = req.params.review_id;
//   const checkArticle = fetchReviewById(reviewId);
//   const fetchingComments = fetchCommentsByReviewId(reviewId);

//   Promise.all([checkArticle, fetchingComments])
//     .then((commentData) => {
//       res.status(200).send({ comments: commentData[1] });
//     })
//     .catch((err) => next(err));
// };

// const postComment = (req, res, next) => {
//   writeComment(req.params.review_id, req.body)
//     .then((comment) => {
//       res.status(201).send({ comments: comment });
//     })
//     .catch((err) => next(err));
// };

// const getUsers = (req, res, next) => {
//   fetchUsers()
//     .then((users) => {
//       res.status(200).send({ users });
//     })
//     .catch((err) => next(err));
// };

// const deleteComment = (req, res, next) => {
//   const { comment_id } = req.params;
//   eraseComment(comment_id)
//     .then(() => {
//       res.sendStatus(204).send()
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

// const getEndpoints = (req, res, next) => {
//   fetchEndpoints()
//   .then(endpoints => res.status(200)
//   .send({ endpoints }))
//   .catch(err => next(err));
// };

// const patchComment = (req, res, next) => {
//   const{ comment_id } = req.params;
//   const { inc_votes } = req.body;
//   updateComment(comment_id, inc_votes)
//     .then((comment) => {
//       res.status(200).send({ comment });
//     })
//     .catch((err) => next(err));
// };

// const patchReview = (req, res, next) => {
//   const { review_id } = req.params;
//   const { inc_votes } = req.body;
//     updateReview(review_id, inc_votes)
//       .then((review) => {
//         res.status(200).send({ review });
//       })
//       .catch((err) => next(err));
// };

// const postReview = (req, res, next) => {
//   insertReview(req.body)
//     .then((res) => {
//       return fetchReviewById(res.review_id)
//     })
//     .then((review) => res.status(201).send({ review }))
//     .catch((err) => next(err));
// };

// const deleteReview = (req, res, next) => {
//   const { review_id } = req.params
//   removeReview(review_id)
//     .then(() => {
//       res.status(204).send()
//     })
//     .catch((err) => next(err));
// };

// const getUser = (req, res, next) => {
//   const { username } = req.params;
//   fetchUser(username)
//     .then((user) => {
//       res.status(200).send({ user });
//     })
//     .catch((err) => next(err));
// };

// module.exports = {
//   getCategories,
//   postCategories,
//   getReviews,
//   getReviewById,
//   postComment,
//   getCommentsByReviewId,
//   patchReview,
//   getUsers,
//   deleteComment,
//   getEndpoints,
//   patchComment,
//   patchReview,
//   postReview,
//   deleteReview,
//   getUser,
// };
