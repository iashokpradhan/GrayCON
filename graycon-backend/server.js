const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to handle JSON data
app.use(express.json());

// Serve the frontend files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../graycon-frontend')));

// A simple API route to test if the backend is working
app.get('/api/status', (req, res) => {
    res.json({ message: "GrayCON Backend is running!", time: new Date() });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});