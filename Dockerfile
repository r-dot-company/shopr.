FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "start"]
