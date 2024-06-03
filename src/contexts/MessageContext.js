import React, { useState } from "react";

const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (type, text, details) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type, text, details, timestamp: new Date() },
    ]);
  };

  const removeMessage = (index) => {
    setMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
