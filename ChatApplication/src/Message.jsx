import React from 'react';

const Message = ({ messageList }) => {
  return (
    <div className="messages">
      <p>Chats</p>
      <ul>
        {messageList.map((message, index) => (
          <li key={index}>
            <span className="user">{message.username}</span>
            <span className="timestamp">{message.timestamp}</span>
            <span className="message">{message.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Message;
