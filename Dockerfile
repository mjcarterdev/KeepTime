FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV JWT_SECRET="SECRET123"
ENV JWT_REFRESH_SECRET="ANOTHER_SECRET123"
ENV DATABASE_URL="postgres://postgres:zQF5KQWUJXvMMXy@keeptime-postgres.flycast:5432/keeptime?schema=public&sslmode=disable"
RUN npm run build
RUN cd ./src/server && npx prisma migrate deploy
CMD [ "npm", "run", "prod"]
