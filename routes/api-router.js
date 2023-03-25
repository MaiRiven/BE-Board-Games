const apiRouter = require('express').Router();
const {getEndpoints} = require('../controllers/endpointsController');
const commentRouter = require('./comment-router');
const reviewRouter = require('./review-router');
const userRouter = require('./user-router');
const categoryRouter = require('./category-router');

apiRouter.get('/', getEndpoints);

apiRouter.use('/comments', commentRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/categories', categoryRouter);

module.exports = apiRouter;