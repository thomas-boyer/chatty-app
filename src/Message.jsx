import React, { Component } from 'react';

const getImages = (message) =>
{
  if (message.match(/(\S)+\.(jpg|jpeg|png|gif)/g))
  {
    const images = message.match(/(\S)+\.(jpg|jpeg|png|gif)/g);
    return images;
  }
  else return false;
}

const Message = ({ type, content, username, color }) =>
{
  const images = getImages(content);
  const imageElements = (images && images.map( (image) =>
    {
      return (<img src={image} />);
    }));
  return (
    <div>
      { type === 'incomingMessage' &&
        (
          <div>
            <div className="message">
              <span className="message-username" style={{color}}>{ username }</span>
              <span className="message-content">{ content }</span>
            </div>
          { imageElements }
          </div>
        ) }
      { type === 'incomingNotification' &&
        (
          <div className="message system">
            { content }
          </div>
        ) }
    </div>
  );
}

export default Message;