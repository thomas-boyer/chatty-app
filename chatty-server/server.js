const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

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

wss.on('connection', (ws) => {

  ws.on('message', function incoming(data) {
    const messageObj = isJSONString(data);
    if (messageObj)
    {
      if (messageObj.type === "incomingMessage") console.log(`User ${messageObj.username} said "${messageObj.content}"`)
    }
    else console.log(data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
