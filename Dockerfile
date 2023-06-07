FROM node:16-alpine as build
WORKDIR /app
COPY src ./
COPY public ./
COPY index.html package.json package-lock.json vite.config.js default.conf.template ./
RUN npm install
RUN npm run build

FROM nginx:1.25.0-alpine
COPY --from=build /app/build /var/www
COPY default.conf.template /etc/nginx/templates/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
