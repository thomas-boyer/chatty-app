import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component
{
  constructor()
  {
    super();
    this.state =
    {
      currentUser: 'Anonymous',
      numUsers: 1,
      usernameSubmitted: true,
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount = () =>
  {
    const ws = this.socket;

    ws.onmessage = (event) =>
    {
      const messageObj = JSON.parse(event.data);

      if (messageObj.numUsers) this.setState({ numUsers: messageObj.numUsers });

      this.setState( (state) =>
        {
          return { messages: state.messages.concat(messageObj) };
        });
    };
  }

  render()
  {
    return (
      <div>
        <NavBar numUsers={this.state.numUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} submitMessage={this.submitMessage} submitUsername={this.submitUsername} usernameSubmitted={this.state.usernameSubmitted}/>
      </div>
    );
  }

  submitMessage = (e) =>
  {
    if (e.key === 'Enter' && e.target.value && /\S/.test(e.target.value))
    {
      const newMessage =
      {
        type: 'incomingMessage',
        content: e.target.value,
        username: e.target.form[0].value
      };

      this.socket.send(JSON.stringify(newMessage));

      e.target.value = '';
    }
  }

  submitUsername = (e) =>
  {
    if (e.target.value !== this.state.currentUser)
    {
      if (e.key === 'Enter' && e.target.value)
      {
        const newMessage =
        {
          type: 'incomingNotification',
          content: `${this.state.currentUser} changed their name to ${e.target.value}.`,
          username: e.target.value
        };

        this.socket.send(JSON.stringify(newMessage));
        this.setState({usernameSubmitted: true, currentUser: e.target.value});
      }
      else if (e.target.value !== this.state.currentUser)
      {
        this.setState({usernameSubmitted: false});
      }
    }
    else this.setState({usernameSubmitted: true});
  }
}
export default App;
