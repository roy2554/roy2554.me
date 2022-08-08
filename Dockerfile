FROM node:16.13.0
RUN apt-get update

ADD src /var/www/html

WORKDIR /var/www/html

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
