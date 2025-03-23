import React, { useState } from "react";
import Message from "../message/Message";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState([]);

  const sendMessage = async () => {
    if (!input.trim() || perguntas.length >= 3) return;

    const userMessage = { sender: "Usuário", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setPerguntas((prev) => [...prev, input]);

    try {
      const response = await fetch("https://chatbot-back-p11b.onrender.com/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: input }),
      });

      const data = await response.json();
      const botMessage = { sender: "Chatbot", text: data.resposta };
      setMessages((prev) => [...prev, botMessage]);
      setRespostas((prev) => [...prev, data.resposta]);
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

  const imprimirRelatorio = () => {
    const relatorioHTML = `
      <html>
        <head>
          <title>Relatório do Chatbot</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #003366; }
            .bloco { margin-bottom: 20px; }
            .bloco strong { display: block; margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <h2>Relatório do Chatbot - AppLog</h2>
          ${perguntas.map((p, i) => `
            <div class="bloco">
              <strong>Pergunta ${i + 1}:</strong> ${p}
              <strong>Resposta:</strong> ${respostas[i]}
            </div>
          `).join("")}
        </body>
      </html>
    `;

    const novaJanela = window.open("", "_blank");
    novaJanela.document.write(relatorioHTML);
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
          disabled={perguntas.length >= 3}
        />
        <button onClick={sendMessage} disabled={perguntas.length >= 3}>
          Enviar
        </button>
      </div>
      {perguntas.length === 3 && (
        <button onClick={imprimirRelatorio} className="relatorio-btn">
          Gerar Relatório
        </button>
      )}
    </div>
  );
};

export default Chatbot;
