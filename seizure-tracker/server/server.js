import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import seizureRoutes from './routes/seizure.js';
import alertRoutes from './routes/alert.js';

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean); // Filter out any undefined values

app.use(cors({ 
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/seizures', seizureRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('SeizureSafe API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
