# BUILD PHASE
FROM node:10.17.0

WORKDIR '/app'

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.26

# add app
COPY . /app

# BUILD
RUN npm run ng build -- --deploy-url=/karya/ --prod

# RUN PHASE
FROM nginx
EXPOSE 80
COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=0 /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]