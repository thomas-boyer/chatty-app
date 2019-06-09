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
      //Number of users currently connected
      numUsers: 1,
      //Will be false if user has changed their username without pressing "enter"
      usernameSubmitted: true,
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount = () =>
  {
    const ws = this.socket;

    //On receiving a message, parse it and add it to the state
    ws.onmessage = (event) =>
    {
      const messageObj = JSON.parse(event.data);

      //If the message specifies a new number of users, update the state appropriately
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
    //Send message if the user has pressed enter,
    //the message is not null, and the message is not just whitespace
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
    //Check if username input value is different than username in state
    if (e.target.value !== this.state.currentUser)
    {
      //If so, submit username on pressing enter;
      //until then, tell state that username has not yet been submitted
      if (e.key === 'Enter' && e.target.value)
      {
        //Send new username notification
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
