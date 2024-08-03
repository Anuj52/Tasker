const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const { PORT } = process.env;

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Apply auth routes without authentication protection for tasks
app.use('/api/tasks', taskRoute); // Task routes no longer need authentication
app.use('/api/auth', authRoute); // Auth routes remain with authentication

app.use(errorHandler); // Error handling middleware should be the last

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
