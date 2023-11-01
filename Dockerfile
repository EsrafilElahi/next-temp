# ===================== deps
FROM node:20-alpine3.17 as deps

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install



# ===================== run in dev mode
FROM deps AS dev

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]



# ===================== build
FROM deps AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build



# ===================== prod - run after build
FROM builder AS prod

WORKDIR /app

ENV NODE_ENV production 

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# for custome config file
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["yarn", "start"]