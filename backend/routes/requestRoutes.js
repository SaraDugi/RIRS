const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.get('/', requestController.getAllGroupedRequests);
router.put('/', requestController.updateRequestStatus);
module.exports = router;