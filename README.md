# CXA-Group-Test: Movie Hub

This is a movie gallery web app project, made by Le Huan , in order to solve the question of CXA Group's Test

## Live Demo

The live demo is on my website [https://wezone.vn](https://wezone.vn)

Why wezone.vn ? - Because I have already owned an unused domain name wezone.vn. 

## Installation

There are 2 options to run this project:

### 1. With NPM (development environment)

Just use the npm to install packages and run the project.

(Node Version >= 12)

#### For frontend
```bash
cd frontend 
npm install 
npm start
```
#### For backend
```bash
cd backend 
npm install 
npm start-dev
```

Access to [http://localhost:8000](http://localhost:8000) to use Movie Hub 

### 2. With Docker (development environment)

Ensure that you have already install docker and docker-compose

#### 2.1 Config the server host

If you use on your localhost, modify the configuration file in ./frontent/config/production.js

Just modify this line:
```bash
BACKEND_CLIENT_URL: 'https://wezone.vn/api',
```
Into this:
```bash
BACKEND_CLIENT_URL: 'http://localhost:9001/api',
```

#### 2.2 Build dist folder

#### For frontend
```bash
cd frontend 
npm install
npm run build 
```

#### For backend
```bash
cd backend 
npm install
npm run build 
```
The dist folder will be created as name "dist"

#### 2.3 Build and run docker's containers with docker-compose 
```bash
docker-compose up --build
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
