const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const requestController = require("../controllers/requestController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", userController.registerUser);
router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);
router.get("/loggedIn", verifyToken, userController.getLoggedInUser);
router.put("/toggle/:id", userController.toggleUserTypeById);
router.post("/request", verifyToken, requestController.createRequest);
module.exports = router;
