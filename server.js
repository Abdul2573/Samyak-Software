const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests


const db = mysql.createConnection({
    host: 'localhost',
    user: 'xxxx', // Replace with your MySQL username
    password: 'xxxxx', // Replace with your MySQL password
    database: 'xxxx'//Replace with your database name
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Get all jewelry items
app.get('/api/jewelry', (req, res) => {
    db.query('SELECT * FROM jewelry', (err, results) => {
        if (err) {
            console.error('Error fetching jewelry items:', err);
            res.status(500).json({ error: 'Failed to fetch jewelry items' });
        } else {
            res.json(results);
        }
    });
});

// Add new jewelry item
app.post('/api/jewelry', (req, res) => {
    const { name, price, description, image_url } = req.body;

    // Validate data
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    // Insert data into the database
    const query = 'INSERT INTO jewelry (name, price, description, image_url) VALUES (?, ?, ?, ?)';
    db.query(query, [name, price, description, image_url], (err, results) => {
        if (err) {
            console.error('Error adding jewelry item:', err);
            res.status(500).json({ error: 'Failed to add jewelry item' });
        } else {
            res.status(201).json({ id: results.insertId, name, price, description, image_url });
        }
    });
});
;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
