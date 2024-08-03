const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');
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

// Apply protect middleware only to routes that need authentication
app.use('/api/tasks', auth.protect, taskRoute);
app.use('/api/auth', authRoute); // Auth routes do not need protection

app.use(errorHandler); // Error handling middleware should be the last

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
