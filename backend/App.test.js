const dotenv = require('dotenv');
const mysql = require('mysql2');
const request = require('supertest');
const app = require('./server'); 

dotenv.config();

const createDbConnection = () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.PORT,
    });
};

test('morajo biti določene vse zahtevane okoljske spremenljivke', () => {
    const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'PORT'];

    requiredEnvVars.forEach((envVar) => {
        expect(process.env[envVar]).toBeDefined();
    });
});

test('ne bi smelo vzpostaviti povezave z bazo podatkov z neveljavnimi podatki', (done) => {
    const db = mysql.createConnection({ host: process.env.DB_HOST, user: 'invalid_user', password: 'invalid_password', database: process.env.DB_NAME, port: process.env.PORT });

    db.connect((err) => {
        expect(err).not.toBeNull();
        db.end();
        done();
    });
});

test('mora vrniti napako za neveljavno posodobitev zahteve', async () => {
    const invalidRequestData = { id: null, status: null };

    const response = await request(app).put('/api/requests').send(invalidRequestData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Request ID and status are required');
});

test('bi se moral uspešno prijaviti z veljavnimi podatki', async () => {
    const validCredentials = { user: { email: 'test.test3@gmail.com', geslo: 'Test123' } };

    const response = await request(app).post('/api/users/login').send(validCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.message).toBe('Login successful');
});


test('mora vrniti napako za prijavno z napacnimi podatki', async () => {
    const invalidCredentials = {
        user: { email: 'wrong@example.com', geslo: 'wrongpassword' },
    };

    const response = await request(app).post('/api/users/login').send(invalidCredentials);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User does not exist');
});

test('bi moral preveriti, ali metoda GET obstaja za /api/requests', async () => {
    const response = await request(app).get('/api/requests');
    expect(response.status).not.toBe(404); 
});

test('bi moral preveriti, ali metoda PUT obstaja za /api/requests', async () => {
    const response = await request(app).put('/api/requests');
    expect([200, 400, 403, 500]).toContain(response.status);
});

test('bi moral preveriti, ali metoda DELETE obstaja za /api/requests/:id', async () => {
    const response = await request(app).delete('/api/requests/1'); 
    expect([200, 400, 403, 404, 500]).toContain(response.status); 
});

test('mora vrniti napako za napačne podatke POST zahteve na napačni poti POST', async () => {
    const response = await request(app).post('/api/requests').send({});
    expect(response.status).toBe(404);
});

test('mora vrniti napako za napačne podatke POST zahteve na napačni poti DELETE', async () => {
    const response = await request(app).delete('/api/requests').send({});
    expect(response.status).toBe(404);
});

const db = require('./db');

afterAll((done) => {

    db.end((err) => {
        if (err) {
            console.error('Error closing the MySQL connection:', err);
            done(err);
        } else {
            console.log('MySQL connection closed');
            done();
        }
    });

});