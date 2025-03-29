// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');

require('./config/mongoConnnection'); // Database connection

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use(require('./routes/index')); // Routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});