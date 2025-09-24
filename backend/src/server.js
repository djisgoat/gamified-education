import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Validate environment variables (skip PORT since you already default it)
const requiredEnvVars = ['MONGODBURI', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing environment variable: ${varName}`);
    process.exit(1);
  }
});

// ✅ CORS
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRouter);

// ✅ Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
