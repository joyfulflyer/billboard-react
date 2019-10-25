FROM nginx:1.17.5

COPY ./ngnix/conf /etc/nginx
COPY ./build /var/www