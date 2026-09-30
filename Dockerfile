FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY data ./data

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV DATA_FILE=/app/data/tasks.json

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node src/healthcheck.js

CMD ["node", "src/server.js"]
