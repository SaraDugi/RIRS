const Request = require("../models/requestModel");

exports.createRequest = (req, res) => {
  try {
    const { dopusti } = req.body;
    const userId = req.userId;

    const newRequest = {
      uporabnik_id: userId,
      datum_zahteve: new Date(),
      komentar: "",
      stanje: "in progress",
    };

    Request.create(newRequest, (error, result) => {
      if (error) {
        console.error("Error creating request:", error);
        return res.status(500).json({ message: "Failed to create request" });
      }

      const requestId = result.insertId;

      dopusti.forEach((dopust) => {
        const dopustData = {
          zacetek: dopust.startDate,
          konec: dopust.endDate,
          razlog: dopust.razlog,
          tip_dopusta_id: dopust.tip,
          zahteva_id: requestId,
        };

        Request.createLeave(dopustData, (leaveError) => {
          if (leaveError) {
            console.error("Error creating leave:", leaveError);
          }
        });
      });

      res.status(201).json({ message: "Request created successfully" });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Unexpected error occurred" });
  }
};
