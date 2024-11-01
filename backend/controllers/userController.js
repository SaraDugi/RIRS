const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { user } = req.body;
    try {
        User.findByEmail(user.email, (err, results) => {
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' });
            }
            bcrypt.hash(user.geslo, 10, (err, hashedPassword) => {
                if (err) throw err;

                const newUser = {
                    ime: user.ime,
                    priimek: user.priimek,
                    email: user.email,
                    geslo: hashedPassword,
                    tip_uporabnika_id: 1
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

exports.loginUser = async (req, res) => {
    const { user } = req.body;
 
    try {

        User.findByEmail(user.email, async (error, results) => {
            if (error) {
                console.error("Database error:", error); 
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            const userFromDb = results[0]; 
            
            const isMatch = await bcrypt.compare(user.geslo, userFromDb.geslo);
            
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { 
                    id: userFromDb.id, 
                    email: userFromDb.email, 
                    name: userFromDb.ime, 
                    lastName: userFromDb.priimek 
                }, 
                "process.env.JWT_SECRET",
                { expiresIn: '1h' } 
            );

            res.status(200).json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLoggedInUser = async (req, res) => {
    try {
        const result = await User.findById(req.userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { id, ime, priimek, email } = result;
        res.status(200).json({ id, ime, priimek, email });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};