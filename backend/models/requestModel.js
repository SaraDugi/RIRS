const db = require("../db");

const Request = {
  create: (requestData, callback) => {
    const query = `INSERT INTO zahteva (komentar, uporabnik_id, datum_zahteve, stanje) VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [
        requestData.komentar,
        requestData.uporabnik_id,
        requestData.datum_zahteve,
        requestData.stanje,
      ],
      callback
    );
  },

  createLeave: (leaveData, callback) => {
    const query = `INSERT INTO dopust (zacetek, konec, razlog, tip_dopusta_id, zahteva_id) VALUES (?, ?, ?, ?, ?)`;
    db.query(
      query,
      [
        leaveData.zacetek,
        leaveData.konec,
        leaveData.razlog,
        leaveData.tip_dopusta_id,
        leaveData.zahteva_id,
      ],
      callback
    );
  },
};

module.exports = Request;
