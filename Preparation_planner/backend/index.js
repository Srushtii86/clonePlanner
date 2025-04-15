const express = require('express');
const cors = require('cors'); // Import CORS
const mongoDB = require("./db");

const app = express(); // Define 'app' before using it
const port = 5000;

mongoDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/user', require('./routes/user')); // ✅ Register new route

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
