FROM node:14-alpine AS builder

# Define working directory
WORKDIR "/communication-service"

COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production


FROM node:14-alpine AS production

WORKDIR "/communication-service"
EXPOSE 3000
COPY  src/config/config.yaml ./dist/config/config.yaml
COPY  package.json ./package.json
COPY  package-lock.json ./package-lock.json
COPY  dist ./dist
COPY  node_modules ./node_modules

CMD [ "sh", "-c", "npm run start:prod"]