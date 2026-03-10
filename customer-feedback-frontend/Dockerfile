# Build Stage
FROM node:20.20.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
  
# Production Stage
FROM nginx:stable-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t cfs-a-f-img .
# docker run -p 80:80 --name cfs-a-f-ctnr cfs-a-f-img