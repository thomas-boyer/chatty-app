const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const clients = [];

function isJSONString(string)
{
  try
  {
    const object = JSON.parse(string);
    return object;
  }
  catch (e)
  {
    return false;
  }
}

function randomColor()
{
  const colors = ['#00efef', '#ff4992', '#f39025', '#aaa']
  return colors[Math.floor(Math.random() * colors.length)];
}

wss.on('connection', (ws) =>
{
  console.log("Client has connected");
  ws.username = 'Anonymous';
  ws.color = randomColor();

  wss.clients.forEach( (client) =>
    {
      const joinMessage =
      {
        key: uuidv4(),
        numUsers: wss.clients.size,
        content: 'Anonymous user has joined the chat.',
        type: 'incomingNotification'
      }
      client.send(JSON.stringify(joinMessage));
    });

  ws.on('message', (data) =>
  {
    const messageObj = isJSONString(data);

    if (messageObj)
    {
      if (messageObj.type === 'incomingNotification')
      {
        ws.username = messageObj.username;
      }
      const { username, content, type } = messageObj;
      const response =
      {
        key: uuidv4(),
        username,
        content,
        type,
        color: ws.color
      };
      wss.clients.forEach( (client) =>
      {
        client.send(JSON.stringify(response));
      });
    }
    else console.log(data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>
    {
      const message =
      {
        key: uuidv4(),
        numUsers: wss.clients.size,
        content: `${ws.username} has left the chat.`,
        type: 'incomingNotification'
      };

      wss.clients.forEach( (client) =>
        {
          if (client !== ws)
          {
            client.send(JSON.stringify(message));
          }
        });
    });
});
