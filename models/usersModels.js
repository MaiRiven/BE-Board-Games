const fs = require('fs/promises');
const db = require('../db/connection.js');

const fetchUsers = () => {
    return db.query(`
        SELECT * FROM users;
    `)
    .then((res) => {
        const usersRows = res.rows;
        return usersRows;
    });
};

const fetchUser = (username) => {
    return db.query(`
        SELECT * FROM users WHERE username = $1
    `, [username])
    .then((result) => {
        if(!result.rowCount) {
            return Promise.reject({ status: 404, msg: 'user not found'})
        }
        return result.rows[0]
    })
};

module.exports = { fetchUsers, fetchUser };