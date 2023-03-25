const { fetchCategories, addCategories } = require('../models/categoryModels');

const getCategories = (req, res, next) => {
    fetchCategories()
        .then((categories) => {
            res.status(200).send({categories})
        })
        .catch((err) => next(err));
};

const postCategories = (req, res, next) => {
    addCategories(req.body)
        .then((category) => {
            res.status(201).send({ category })
        })
        .catch((err) => next(err));
};

module.exports = {getCategories, postCategories};