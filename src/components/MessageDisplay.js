import React, { useContext, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import MessageContext from "../contexts/MessageContext";

const MessageDisplay = () => {
  const { messages, removeMessage } = useContext(MessageContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      messages.forEach((message, index) => {
        if (message.type === "info") {
          removeMessage(index);
        }
      });
    }, 5000);

    return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
  }, [messages, removeMessage]);

  return (
    <div>
      {messages.map((message, index) => (
        <Alert
          key={index}
          variant={message.type}
          className="d-flex justify-content-between align-items-start"
        >
          <p>{message.text}</p>
          <Button variant="close" aria-label="Close" onClick={() => removeMessage(index)} />
        </Alert>
      ))}
    </div>
  );
};

export default MessageDisplay;
