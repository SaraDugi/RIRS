const Request = require('../models/requestModel');

exports.getAllGroupedRequests = (req, res) => {
    Request.getAllGrouped((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve requests' });
        }
        res.status(200).json(results);
    });
};

