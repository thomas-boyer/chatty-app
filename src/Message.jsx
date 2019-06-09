import React, { Component } from 'react';

//Check if message includes one or more strings separated by whitespace and ending in an image extension
//If so, return an array of those strings
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
  //If message includes image paths, insert them into <img> tags
  const images = getImages(content);
  const imageElements = (images && images.map( (image) =>
    {
      return (<img src={image} />);
    }));

  //Message layout is changed whether it's a message or a notification
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