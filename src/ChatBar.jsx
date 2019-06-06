import React, {Component} from 'react';

const ChatBar = ({currentUser, submitMessage, submitUsername, usernameSubmitted}) =>
{
  return (
    <form className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUser} onKeyUp={submitUsername} />
      <input className="chatbar-message" placeholder={(usernameSubmitted) ? "Type a message and hit ENTER" : "Please submit your new username"} onKeyUp={submitMessage} disabled={(usernameSubmitted) ? "" : "disabled"} />
    </form>
  )
}

export default ChatBar;