FROM node:16-alpine as build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build --ignore-scripts

FROM nginx:1.25.0-alpine
RUN addgroup -S nginx \
    && adduser -S nginx -G nginx
COPY --from=build /app/build /var/www
COPY default.conf.template /etc/nginx/templates/
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]
