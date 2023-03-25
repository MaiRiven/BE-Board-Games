const db = require('../db/connection.js');

const fetchCategories = () => {
    return db.query(`SELECT * FROM categories;`)
        .then(({ rows }) => {
        return rows;
    });
};

const addCategories = ({slug, description}) => {
    return db.query(`INSERT INTO categories (slug, description) VALUES ($1, $2) RETURNING *`,
    [slug, description])
        .then(({ rows }) => rows[0]);
};

module.exports = { fetchCategories, addCategories };