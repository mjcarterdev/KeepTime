FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build
RUN npx prisma migrate deploy
CMD [ "npm", "run", "prod"]
