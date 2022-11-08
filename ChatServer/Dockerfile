FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/lyra/ChatServer
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /var/jenkins_home/workspace/lyra/ChatServer/build
EXPOSE 4002
CMD ["npm", "run","start"]