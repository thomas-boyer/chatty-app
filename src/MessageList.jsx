import React, { Component } from 'react';
import Message from './Message.jsx';

const MessageList = ({messages}) =>
{
  //Insert each message into Message components and set the appropriate props
  const renderMessages = messages.map( (message) =>
    {
      return (<Message type={message.type} content={message.content} username={message.username} key={message.key} color={message.color}/>)
    });

  return (
    <div>
      { renderMessages }
    </div>
  );
}

export default MessageList;