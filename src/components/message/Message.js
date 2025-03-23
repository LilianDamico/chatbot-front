import React from "react";
import "./Message.css";

const Message = ({ sender, text }) => {
  const isUser = sender === "Usuário";

  return (
    <div className={`message ${isUser ? "user" : "bot"}`}>
      <strong>{sender}: </strong> {text}
    </div>
  );
};

export default Message;
