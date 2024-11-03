const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getAllGroupedRequests);
router.put("/", requestController.updateRequestStatus);
router.get("/all-leaves", requestController.getAllLeaves);
module.exports = router;
