# Deployment 
## Install Dependencies 
### Install Node.js
**Update the package index files on the system**
```bash 
sudo apt-get update
```

**Downloads and installs the most recent packages**
```bash 
sudo apt-get upgrade
```

**Install Node.js**
```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

### Install and Configure MongoDB locally
- Refer to this official documentation by MongoDB to install on Ubuntu: [Link](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
- Refer to this official documentation by MongoDB to install on any other operating system: [Link](https://www.mongodb.com/docs/manual/administration/install-community/)
- Refer to this documentation by Baeldung to enable authentication and remote connection: [Link](https://www.baeldung.com/linux/mongodb-remote-connections)


### Install Docker 
**Install Docker**
```bash
sudo apt-get install docker.io
```

**Start Docker**
```bash
sudo systemctl start docker
```

**Enable Docker**
```bash
sudo systemctl enable docker
```

### API Deployment 
**Change directory**
```bash
cd /website/apis/portal-api
```

**Remove `node_modules` folder**
```bash
rm -r node_modules
```

**Install dependencies**
```bash
npm i
```

**Create a `Dockerfile` file using any text editor**
```bash 
nano Dockerfile
```

Contents in the file 
```Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6060

CMD [ "npm", "start" ]
```

**Create docker image of the API**
```bash
sudo docker build -t web-api .
```

**Run the docker image**
```bash
sudo docker run -p 6060:6060 web-api
```

**Run the docker image in the background**
```bash
sudo docker run -d -p 6060:6060 web-api
```