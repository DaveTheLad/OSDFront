FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

# Attempt to install dependencies with --force flag
RUN npm install --force

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/mangaapp /usr/share/nginx/html

EXPOSE 80
