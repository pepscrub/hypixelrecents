FROM node:16

# # create app dir
# WORKDIR 

# copy over app dependencies
# wildcard is used to copy over package-lock and package.json
COPY package*.json ./

RUN npm install

#  Bundle app source
COPY . .

EXPOSE 8080
CMD ["node", "."]