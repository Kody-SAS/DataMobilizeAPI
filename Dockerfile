# Development stage
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./

RUN npm install

COPY . .

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./

RUN npm install --only=production

COPY . .

CMD ["npm", "serve"]

