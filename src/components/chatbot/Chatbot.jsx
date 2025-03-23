import React, { useState } from "react";
import Message from "../message/Message";
import Relatorio from "../relatorio/Relatorio";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showReport, setShowReport] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "Usuário", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("https://chatbot-back-p11b.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "Chatbot", text: data.response };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "Chatbot",
        text: "❌ Erro ao se comunicar com o servidor.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h2>Chatbot de Logística</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>

      <button className="report-button" onClick={() => setShowReport(true)}>
        Gerar Relatório
      </button>

      {showReport && (
        <Relatorio
          messages={messages}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};

export default Chatbot;
