#!/bin/sh
npm install @prisma/client
npx prisma generate
npm run build
npx prisma db push
npm run start
