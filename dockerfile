# FROM node:14-alpine

# ENV NODE_ENV production

# # USER node
# WORKDIR /app

# COPY package*.json /app/
# RUN npm i

# COPY . /app
# RUN npm run build

# # Server
# ENV MONGODB_HOST=localhost
# ENV MONGODB_PORT=27017
# ENV MONGODB_DB=interview_test_0902
# ENV MONGODB_USER=interview_test_0902
# ENV MONGODB_PWD=interview_test_0902
# ENV SERVER_PORT=9000

# EXPOSE ${SERVER_PORT}
# CMD ["npm", "run", "start:prod"]



FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
  && npm run build \
  && npm prune --production

# ---

FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/
# Server
ENV MONGODB_HOST=localhost
ENV MONGODB_PORT=27017
ENV MONGODB_DB=interview_test_0902
ENV MONGODB_USER=interview_test_0902
ENV MONGODB_PWD=interview_test_0902
ENV SERVER_PORT=9000

CMD ["node", "dist/main.js"]
