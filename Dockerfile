FROM node:15
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
ARG DB_HOST
ENV DB_HOST $DB_HOST
RUN chmod +x docker_migrations.sh
ENTRYPOINT [ "./docker_migrations.sh" ]
CMD [ "node", "app.js" ]