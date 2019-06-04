import React, { Component } from 'react';

const Message = ({ type, content, username }) =>
{
  return (
    <div>
      { type === 'incomingMessage' ?
        (
          <div className="message">
            <span className="message-username">{ username }</span>
            <span className="message-content">{ content }</span>
          </div>
        ) :
        (
          <div className="message system">
            { content }
          </div>
        )}
    </div>
  );
}

export default Message;