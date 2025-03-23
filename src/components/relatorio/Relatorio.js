import React from "react";
import "./Relatorio.css";

const Relatorio = ({ messages, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const perguntasERespostas = [];
  for (let i = 0; i < messages.length; i += 2) {
    if (messages[i] && messages[i + 1]) {
      perguntasERespostas.push({
        pergunta: messages[i].text,
        resposta: messages[i + 1].text,
      });
    }
  }

  return (
    <div className="relatorio">
      <h3>Relatório de Perguntas e Respostas</h3>
      {perguntasERespostas.length > 0 ? (
        <ul>
          {perguntasERespostas.map((item, index) => (
            <li key={index}>
              <strong>Pergunta:</strong> {item.pergunta}<br />
              <strong>Resposta:</strong> {item.resposta}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há perguntas respondidas ainda.</p>
      )}
      <button onClick={handlePrint}>Imprimir</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Relatorio;
