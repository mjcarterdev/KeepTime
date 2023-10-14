import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import projectRouter from './routes/projectRoutes';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

dotenv.config();
const app = express();

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.use(bodyParser.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? 'http://localhost:5173' : process.env.FRONT_URL,
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/user', userRouter);

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV ? 'production' : 'dev'} mode`),
);
