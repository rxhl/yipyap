# Yip Yap

A secure and lightweight chat app built with React, Node and Socket.io.

## Quick Start

Go to https://yipyap.netlify.com/ and create a chat room by entering a username and room name. You can then share this room with another person to start chatting. No data is stored on the server.

  <img src="/assets/yipyap.gif" />


## Development

The project includes two sections: **client** (React app) and **server** (Node app). The client interacts with the server over a socket provided by socket.io library.

```bash
git clone https://github.com/rxhl/yipyap.git && cd yipyap

# client
cd client
npm install
npm start # opens the app on port 3000

# server
cd server
npm install
nodemon # starts the server on port 5000
```

## Deployment

The client is deployed on [Netlify](https://www.netlify.com/) and the server on [Heroku](https://www.heroku.com/).
