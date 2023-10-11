import express from 'express';
import cors from 'cors';
import ViteExpress from 'vite-express'

const app = express();
const PORT = process.env.NODE_ENV==="production" ? 3000 : 3001;

const server = app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV ? 'production' : 'dev'} mode`)
);

app.use(cors());

app.use(express.json());

app.get('/api/home', (_req, res) => {
  res.send('Hello Home');
});

ViteExpress.bind(app, server);
