FROM node:16-alpine as build
WORKDIR /app
COPY . ./
RUN npm install --ignore-scripts
RUN npm run build

FROM nginx:1.25.0-alpine
RUN addgroup -S app \
    && adduser -S app -G app
COPY --from=build /app/build /var/www
COPY default.conf.template /etc/nginx/templates/
EXPOSE 80
USER app
CMD ["nginx", "-g", "daemon off;"]
