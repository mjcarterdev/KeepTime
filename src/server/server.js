import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.use(bodyParser.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
// app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV ? 'production' : 'dev'} mode`),
);
