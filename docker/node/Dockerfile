FROM node:15.6.0-buster-slim AS builder
ENV NODE_ENV production

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY ./frontend/package.json .
COPY ./frontend/yarn.lock .
RUN yarn install

COPY ./frontend .
RUN yarn run build

FROM node:15.6.0-buster-slim
RUN yarn global add serve
WORKDIR /app/frontend
COPY --from=builder /app/frontend/build .
CMD ["serve", "-p", "5000", "-s", "."]
