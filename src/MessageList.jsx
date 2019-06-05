import React, { Component } from 'react';
import Message from './Message.jsx';

const MessageList = ({messages}) =>
{
  const theMessages = messages.map( (message) =>
    {
      return (<Message type={message.type} content={message.content} username={message.username} key={message.key}/>)
    });

  return (
    <div>
      { theMessages }
    </div>
  );
}

export default MessageList;