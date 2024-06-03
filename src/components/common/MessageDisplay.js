import React, { useContext, useEffect } from "react";
import { Alert, Button, Collapse } from "react-bootstrap";
import MessageContext from "../../contexts/MessageContext";

//   primary, secondary, success, danger, warning, info, light, dark
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

    return () => clearTimeout(timer);
  }, [messages, removeMessage]);

  return (
    <div>
      {messages.map((message, index) => (
        <Alert
          key={index}
          variant={message.type}
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <p>{message.text}</p>
            <Collapse in={message.details}>
              <div>
                <p>{message.details}</p>
              </div>
            </Collapse>
          </div>
          <div>
            <Button variant="close" aria-label="Close" onClick={() => removeMessage(index)} />
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default MessageDisplay;
