FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.21.4-alpine
ENV BACKEND_API ecommerce-app-api.azurewebsites.net
COPY --from=build /app/build /var/www
COPY default.conf.template /etc/nginx/templates/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
