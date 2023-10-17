import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import subtaskRouter from './routes/subtaskRoutes.js';
import swaggerRouter from './routes/swaggerRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = ['https://keeptime-prod.fly.dev', 'http://localhost:3001', 'http://localhost:3000'];

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.use(bodyParser.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    withCredentials: true,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);
app.use('/api/subtask', subtaskRouter);

if (process.env.NODE_ENV != 'production') {
  app.use('/api/swagger', swaggerRouter);
}

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV ? 'production' : 'dev'} mode`),
);
