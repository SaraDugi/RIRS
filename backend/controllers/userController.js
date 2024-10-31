const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { ime, priimek, email, geslo, tip_uporabnika } = req.body;

    try {
        User.findByEmail(email, (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }

            bcrypt.hash(geslo, 10, (err, hashedPassword) => {
                if (err) throw err;

                const newUser = {
                    ime,
                    priimek,
                    email,
                    geslo: hashedPassword,
                    tip_uporabnika: tip_uporabnika || 'regular'
                };

                User.create(newUser, (err, result) => {
                    if (err) throw err;
                    res.status(201).json({ message: 'User registered successfully' });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve users' });
        }
        res.status(200).json(results);
    });
};