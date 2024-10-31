const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./db');  // Import connectDB

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 23077;

// Call connectDB to try connecting to the database
connectDB();

// Define routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Test API endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});