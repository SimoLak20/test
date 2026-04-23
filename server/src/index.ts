import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


console.log("🚀 SERVER BOOT SEQUENCE STARTED...");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Test Route
app.get('/', (req, res) => {
  res.send("Backend is alive and reaching for the database...");
});

// 2. Database Connection Logic
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/elearning_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ DATABASE: Connected to MongoDB via Docker');
    
    // 3. Start Server ONLY after DB is ready
    app.listen(PORT, () => {
      console.log(`✅ SERVER: Running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DATABASE ERROR:', err.message);
    process.exit(1); // Stop if we can't connect
  });

  import authRoutes from './routes/authRoutes';

// Add this line after app.use(express.json());
app.use('/api/auth', authRoutes);
 

app.use(cors()); // 2. Enable it BEFORE your routes
app.use(express.json());

// ... your app.use('/api/auth', authRoutes) etc.