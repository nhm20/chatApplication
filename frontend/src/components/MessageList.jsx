import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message._id} className={`message ${message.seen ? 'seen' : 'unseen'}`}>
          <span className="message-sender">{message.senderId}</span>
          <span className="message-text">{message.message}</span>
          <span className="message-timestamp">{new Date(message.createdAt).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;