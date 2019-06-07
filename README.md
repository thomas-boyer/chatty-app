ChattyApp
=====================

A small chat client made using React and WebSockets.

Users can connect to a server and send messages to one another. Users can select custom usernames and, if they post a valid link to an online image, the app will display the image.

### Pix

!["The chat app"](https://github.com/thomas-boyer/chatty-app/blob/master/docs/chatty-1.png)

### Start it up!

Clone and navigate to the project.

```
git clone git@github.com:thomas-boyer/chatty-app.git
cd chatty-app
```

Install the server dependencies and run the server.

```
cd chatty-server
npm i
node server.js
```

In a new shell tab, navigate to the top level, install the client-side dependencies, and run the app.

```
cd chatty-app
npm i
npm start
```

### Client-side dependencies

* [React](https://github.com/facebook/react)
* [React-DOM](https://github.com/facebook/react/tree/master/packages/react-dom)

### Server-side dependencies

* [Express](https://github.com/expressjs/express)
* [UUID](https://github.com/kelektiv/node-uuid)
* [ws](https://github.com/websockets/ws)