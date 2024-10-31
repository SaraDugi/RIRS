const db = require('../db');

const User = {
    create: (userData, callback) => {
        const query = `INSERT INTO users (ime, priimek, email, geslo, tip_uporabnika) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [userData.ime, userData.priimek, userData.email, userData.geslo, userData.tip_uporabnika], callback);
    },

    findByEmail: (email, callback) => {
        const query = `SELECT * FROM users WHERE email = ?`;
        db.query(query, [email], callback);
    },

    getAll: (callback) => {
        const query = `SELECT id, ime, priimek, email, tip_uporabnika FROM users`;
        db.query(query, callback);
    }
};

module.exports = User;