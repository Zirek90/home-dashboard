FROM node:16 AS builder

WORKDIR /app

# Step 2: Install dependencies (including bcrypt)
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Rebuild bcrypt in this environment
RUN npm rebuild bcrypt --build-from-source

FROM node:16

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/frontend /app/frontend  
COPY tsconfig.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
