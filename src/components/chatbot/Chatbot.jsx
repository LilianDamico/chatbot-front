import React, { useState } from "react";
import Message from "../message/Message";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [interactionCount, setInteractionCount] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || interactionCount >= 3) return;

    const userMessage = { sender: "Usuário", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch("https://chatbot-back-p11b.onrender.com/perguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "Chatbot", text: data.resposta };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      setInteractionCount((prev) => prev + 1);

      if (interactionCount + 1 === 3) {
        setShowReport(true);
      }
    } catch (error) {
      const errorMessage = {
        sender: "Chatbot",
        text: "❌ Erro ao se comunicar com o servidor.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const gerarRelatorio = () => {
    let conteudo = "<html><head><title>Relatório do Chatbot</title></head><body>";
    conteudo += "<h2>Relatório - Chatbot de Logística</h2>";
    for (let i = 0; i < messages.length; i++) {
      conteudo += `<p><strong>${messages[i].sender}:</strong> ${messages[i].text}</p>`;
    }
    conteudo += "</body></html>";

    const novaJanela = window.open("", "_blank");
    novaJanela.document.write(conteudo);
    novaJanela.document.close();
    novaJanela.print();
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
          disabled={interactionCount >= 3}
        />
        <button onClick={sendMessage} disabled={interactionCount >= 3}>
          Enviar
        </button>
      </div>
      {showReport && (
        <button className="relatorio-btn" onClick={gerarRelatorio}>
          📄 Gerar Relatório
        </button>
      )}
    </div>
  );
};

export default Chatbot;
