import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';
import Message from '../Message/Message';

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, index) => (
        <div key={index}>
          <Message name={name} message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
