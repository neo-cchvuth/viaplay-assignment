# Two-Stage build for smaller image size
# use bullseye-slim variant for less vulnerability but larger image size
FROM node:18.15-alpine as build
WORKDIR /usr/src/backend
COPY . .
RUN npm pkg delete "scripts.prepare"
RUN npm i --silent
RUN npm run build

FROM node:18.15-alpine
ENV NODE_ENV=production
WORKDIR /usr/backend
COPY --from=build /usr/src/backend/package*.json .
# now installs only prod packages
RUN npm i --silent
COPY --from=build /usr/src/backend/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/main" ]