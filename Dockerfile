FROM node:21-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


COPY .env.example ./.env

RUN npx prisma generate
COPY prisma ./prisma/

RUN npm run build

FROM node:21

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]