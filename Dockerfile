FROM node:16.20-alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json .
RUN npm install
COPY . . 
EXPOSE 6969
CMD ["npm", "run", "dev"]