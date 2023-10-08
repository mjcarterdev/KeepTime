import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// App files here
app.use(express.static(path.join(process.cwd(), '/public')));

// Serve app production bundle
app.use(express.static('dist/app'));

app.get('/api/home', (_req, res) => {
  res.send('Hello Home');
});

app.get('*', (_req, res) => {
  res.status(404).send('error api route not found');
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
