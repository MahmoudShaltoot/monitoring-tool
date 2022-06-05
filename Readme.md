# monitoring-tool-app
A `RESTful` API server with a set of routes providing monitoring service for APIs.

## Features
- TypeScript
- Node.js
- RabbitMQ
- Cronjobs

# Running Server locally
## Prerequisites

First, ensure you have the following installed:

1. Node - Download and Install latest version of Node: [NodeJS](http://http://nodejs.org)
2. RabbitMQ - Download and Install [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)


## Documentation
Please find the documentation describing the system architecture here: [https://monitoring-tool.atlassian.net/l/c/cxE7zdTo]

## System design
![alt text](https://github.com/MahmoudShaltoot/monitoring-tool/blob/master/eecf7273-8609-4bc1-bf00-f32c696234b6.png?raw=true)

## Install dependencies

You'll need to download some node modules defined into `package.json` file.

```
npm install
```

## Run the app

```
npm start
```

You'll have available the following `RESTful` services:

```
POST http://localhost:3000/users
POST http://localhost:3000/auth

POST http://localhost:3000/checks
PUT http://localhost:3000/checks/:id

POST http://localhost:3000/reports
```

If you want to change the port, please update `index.ts` file.
