FROM node:alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

COPY app/ .

ENV node=production
ENV port=3001

EXPOSE 3001

CMD ["npm", "start"]