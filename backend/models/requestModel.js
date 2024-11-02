const db = require('../db');

const Request = {

    getAllGrouped: (callback) => {
        const query = `SELECT 
    u.email,
    z.datum_zahteve,
    z.stanje,
    z.komentar,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'zacetek', d.zacetek,
            'konec', d.konec,
            'razlog', d.razlog,
            'tip_dopusta', td.tip
        )
    ) AS dopusti
FROM 
    zahteva z
JOIN 
    uporabnik u ON u.id = z.uporabnik_id
JOIN 
    dopust d ON d.zahteva_id = z.id
JOIN 
    tip_dopusta td ON d.tip_dopusta_id = td.id
GROUP BY 
    z.id, u.email, z.datum_zahteve, z.stanje, z.komentar;`;
        db.query(query, callback);
    },

};

module.exports = Request;