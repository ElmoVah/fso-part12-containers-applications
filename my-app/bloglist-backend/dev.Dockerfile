FROM node:16
  
WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=bloglist-backend-dev:*

CMD ["npm", "run", "dev"]