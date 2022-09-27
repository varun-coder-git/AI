FROM node:lts-stretch as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies

RUN npm install --force

# Generate the build of the application
RUN npm run build --base-href='/biz/'

RUN cd dist
RUN ls -la

# Stage 2: Serve app with nginx server

### STAGE 2: Run ###
#FROM nginx:latest
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/local/app/dist /usr/share/nginx/html
#COPY --from=build /usr/local/app/src/experience /usr/share/nginx/html/act
FROM php:8.0-apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y

#FROM nginx:latest
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist /var/www/html/
COPY --from=build /usr/local/app/src/experience /var/www/html/act
