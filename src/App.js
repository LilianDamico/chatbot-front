import React from 'react';
import Chatbot from './components/chatbot/Chatbot';
import Head from './components/head/Head';
import './App.css';


function App() {
  return (
    <div className="app.container">
      <Head />
      <h2>AppLog, há 10 anos fazendo de sua logística um passeio!</h2>
      <h3>Dúvidas? Consulte nosso chat!</h3>
      <Chatbot />
    </div>
  );
}

export default App;
