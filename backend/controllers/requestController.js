const Request = require('../models/requestModel');

exports.getAllGroupedRequests = (req, res) => {
    Request.getAllGrouped((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve requests' });
        }
        res.status(200).json(results);
    });
};

exports.updateRequestStatus = (req, res) => {
    const { id, status } = req.body;  

    if (!id || !status) {
        return res.status(400).json({ message: 'Request ID and status are required' });
    }

    Request.update(id, status, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to update request status' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request status updated successfully' });
    });
};
