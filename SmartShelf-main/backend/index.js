import express from 'express';
const app = express();

import customerRoutes from './routes/customer.js';
import employeeRoutes from './routes/employee.js';
import authRoutes from './routes/Auth.js';

import database from './config/database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'; // ✅ Add this line

dotenv.config();

const PORT = process.env.PORT || 4000;

// ✅ Connect to database
database();

// ✅ Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded
app.use(cookieParser());

// ✅ Enable file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// ✅ CORS setup
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/employee', employeeRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Your server is up and running...',
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
