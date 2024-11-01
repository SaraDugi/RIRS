const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', userController.registerUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);
router.get('/loggedIn', verifyToken, userController.getLoggedInUser);
module.exports = router;