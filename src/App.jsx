import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor()
  {
    super();
    this.state =
    {
      currentUser: 'Anonymous',
      messages: [
        {
          key: 1,
          type: 'incomingMessage',
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1",
        },
        {
          key: 2,
          type: 'incomingNotification',
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          key: 3,
          type: 'incomingMessage',
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          key: 4,
          type: 'incomingMessage',
          content: "...",
          username: "nomnom"
        },
        {
          key: 5,
          type: 'incomingMessage',
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          key: 6,
          type: 'incomingMessage',
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          key: 7,
          type: 'incomingNotification',
          content: "Anonymous2 changed their name to NotFunny",
        }
      ]
    }
  }

  componentDidMount()
  {
    const ws = this.socket = new WebSocket('ws://localhost:3001');
    ws.onopen = function (event) {
      ws.send("Client connected");
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} submitMessage={this.submitMessage} submitUsername={this.submitUsername}/>
      </div>
    );
  }

  submitMessage = (e) =>
  {
    if (e.key === 'Enter')
    {
      const newMessage =
      {
        key: this.state.messages[this.state.messages.length - 1].key + 1,
        type: 'incomingMessage',
        content: e.target.value,
        username: e.target.form[0].value
      };

      this.socket.send(JSON.stringify(newMessage));

      // const messages = this.state.messages.concat(newMessage);
      // this.setState({messages: messages});

      e.target.value = '';
    }
  }

  submitUsername = (e) =>
  {
    if (e.key === 'Enter')
    {
      const newMessage =
      {
        key: this.state.messages[this.state.messages.length - 1].key + 1,
        type: 'incomingNotification',
        content: `${this.state.currentUser} changed their name to ${e.target.value}`
      };

      const messages = this.state.messages.concat(newMessage);
      this.setState({currentUser: e.target.value, messages: messages});
    }
  }
}
export default App;
