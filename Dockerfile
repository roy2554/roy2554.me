FROM node:16.13.0
RUN apt-get update

ADD . /var/www/html

WORKDIR /var/www/html

RUN cd client && npm install
RUN cd client && npm run build
RUN cd server && npm install
RUN cd server && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
