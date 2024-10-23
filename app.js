const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth')); // User Authentication
app.use('/api/transactions', require('./routes/transactions')); // Transactions

app.get('/', (req, res) => {
  res.send('Personal Finance API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
