import React, {Component} from 'react';

const ChatBar = ({currentUser, submitMessage, submitUsername}) =>
{
  return (
    <form className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUser} onKeyPress={submitUsername}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={submitMessage}/>
    </form>
  )
}

export default ChatBar;