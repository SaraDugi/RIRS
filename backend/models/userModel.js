const db = require('../db');

const User = {
    create: (userData, callback) => {
        const query = `INSERT INTO uporabnik (ime, priimek, email, geslo, tip_uporabnika_id) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [userData.ime, userData.priimek, userData.email, userData.geslo, 1], callback);
    },

    findByEmail: (email, callback) => {
        const query = `SELECT * FROM uporabnik WHERE email = ?`;
        db.query(query, [email], callback);
    },

    getAll: (callback) => {
        const query = `SELECT id, ime, priimek, email, tip_uporabnika_id FROM uporabnik`;
        db.query(query, callback);
    }
};

module.exports = User;