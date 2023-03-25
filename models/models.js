const fs = require('fs/promises');

const db = require("../db/connection.js");

// const fetchCategories = () => {
//   return db.query(`SELECT * FROM categories;`).then((res) => {
//     const categoriesRows = res.rows;
//     return categoriesRows;
//   });
// };

// const fetchReviews = (category, sort_by, order) => {
//   const validColumns = [
//     'owner', 'title', 'review_id', 'category', 'created_at',
//     'votes', 'designer', 'comment_count'
//   ];

//   if (!validColumns.includes(sort_by)) {
//     return Promise.reject({
//       status: 400,
//       msg: "Bad Request",
//     });
//   };

//   const query = {
//     text: `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, 
//       reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, 
//       COUNT(comments.comment_id) AS comment_count FROM reviews 
//       LEFT JOIN comments ON comments.review_id = reviews.review_id
//       WHERE ($1::text IS NULL OR reviews.category = $1)
//       GROUP BY reviews.review_id
//       ORDER BY ${sort_by} ${order};`,
//     values: [category],
//   };

//   return db.query(query)
//     .then((res) => {
//       const reviewRows = res.rows;
//       return reviewRows;
//     });
// };

// const fetchReviewById = (reviewId) => {
//   return db
//     .query(`SELECT * FROM reviews WHERE review_id = $1`, [reviewId])
//     .then((res) => {
//       const review = res.rows;
//       if (review.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "Review not found!",
//         });
//       }
//       const reviewWithCommentCount = Object.assign({}, review[0]);
//       return db.query(`SELECT COUNT(*) FROM comments WHERE review_id = $1`, [reviewId])
//         .then((res) => {
//           reviewWithCommentCount.comment_count = parseInt(res.rows[0].count) || 0;
//           return reviewWithCommentCount;
//     });
//   })
// };

// const fetchCommentsByReviewId = (reviewId) => {
//   return db
//     .query(
//       `SELECT * FROM comments WHERE comments.review_id = $1
//       ORDER BY comments.created_at DESC;`,
//       [reviewId]
//     )
//     .then((res) => {
//       const comments = res.rows;
//       return comments;
//     });
// };

// const writeComment = ({ username, body }, reviewId) => {
//   return db
//     .query(
//       `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *`,
//       [body, username, reviewId]
//     )
//     .then((res) => {
//       return res.rows[0];
//     });
// };

// const patchReview = (review_id, inc_votes) => {
//   return db
//     .query(
//       `UPDATE reviews SET votes = votes + $1
//         WHERE review_id = $2 RETURNING *`,
//         [inc_votes, review_id]
//         )
//     .then((res) => {
//       const updatedReview = res.rows;
//       if (updatedReview.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "Review not found",
//         });
//       } else {
//         return updatedReview;
//       }
//     });
// };

// const fetchUsers = () => {
//   return db.query(`SELECT * FROM users;`).then((res) => {
//     const usersRows = res.rows;
//     return usersRows;
//   });
// };

// const eraseComment = (commentId) => {
//   return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [commentId])
//     .then((res) => {
//       if (!res.rowCount) {
//         return Promise.reject({ status: 404, msg: 'Bad request' })
//       }
//     });
// };

// const fetchEndpoints = () => {
//   return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8')
//   .then((endpointJSON) => {
//     return JSON.parse(endpointJSON)
//   });
// };

// const addCategory = (slug, description) => {
//   return db.query(`INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`,
//   [slug, description])
//   .then(({ rows }) => rows[0]);
// };

// const updateComment = (commentId, voteInc) => {
//   return db.query(`UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`,
//   [voteInc, commentId])
//   .then(res => {
//     if(!res.rowCount){
//       return Promise.reject({ status: 404, msg: 'Comment not found' })
//     }
//     return res.rows[0];
//   });
// };

// const updateReview = (reviewId, voteInc) => {
//   return db.query(`UPDATE reviews SET votes = votes + $1 WHERE review_ud = $2 RETURNING *`,
//   [voteInc, reviewId])
//   .then(res => {
//     if(!res.rowCount) {
//       return Promise.reject({ status: 404, msg: 'review not found' })
//     }
//     return res.rows[0]
//   })
// };

// const insertReview = ({ owner, title, review_body, designer, category, review_img_url }) => {
//   const queryParams = [owner, title, review_body, designer, category]
//   let queryString = `INSERT INTO reviews (owner, title, review_body, designer, category`
//   if (review_img_url) {
//     queryString +=`, review_img_url`
//     queryParams.push(review_img_url)
//   }
//   queryString += `) VALUES ($1, $2, $3, $4, $5`
//   if (review_img_url) queryString += `, $6`
//   queryString += `) RETURNING *`
//   return db.query(queryString, queryParams).then(({ rows }) => {
//     return rows[0]
//   });
// };

// const removeReview = (reviewId) => {
//   return db.query(`DELETE FROM reviews WHERE review_id = $1 RETURNING *`,
//   [reviewId])
//   .then((res) => {
//     if(!res.rowCount) {
//       return Promise.reject({ status: 404, msg: 'review not found'})
//     };
//   });
// };

// const fetchUser = (username) => {
//   return db.query(`SELECT * FROM users WHERE username = $1`,
//   [username])
//   .then((result) => {
//     if(!result.rowCount){
//       return Promise.reject({ status: 404, msg: 'user not found' })
//     }
//     return result.rows[0]
//   })
// };

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewById,
  writeComment,
  fetchCommentsByReviewId,
  patchReview,
  fetchUsers,
  eraseComment,
  fetchEndpoints,
  addCategory,
  updateComment,
  updateReview,
  insertReview,
  removeReview,
  fetchUser,
};