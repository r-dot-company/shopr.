FROM node:16-alpine

ARG REACT_APP_API_URL

WORKDIR /app

COPY . .

RUN yarn --frozen-lockfile
RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "start"]
