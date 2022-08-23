FROM node:14.17.4

RUN mkdir -p /webservice

WORKDIR /webservice

COPY . .

RUN npm i

CMD npm run start

EXPOSE 8000
