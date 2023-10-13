import express from 'express';
import cors from 'cors';
import ViteExpress from 'vite-express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.use(cors());

app.use(express.json());

app.get('/api/home', (_req, res) => {
  res.send('Hello Home');
});

app.get('/api/about', async (_req, res) => {
  let allUsers = await prisma.user.findMany();
  if (allUsers.length === 0) {
    console.log('user is being created');
    await prisma.user.create({
      data: {
        name: ' Bob',
        email: 'bob@bobbinton.com',
        password: 'bobbob',
        projects: {
          create: {
            title: 'test',
            description: 'test goes here',
          },
        },
      },
    });
    allUsers = await prisma.user.findMany();
  }
  res.send(JSON.stringify(allUsers));
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port ${PORT} in ${process.env.NODE_ENV ? 'production' : 'dev'} mode`),
);
