FROM node:8.12

COPY . /app
WORKDIR /app

CMD ["npm", "run", "run"]