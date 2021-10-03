#!/bin/sh
set -e
echo WAITING FOR MYSQL STARTUP
sleep 30
npx sequelize db:create
npx sequelize db:migrate
exec "$@"