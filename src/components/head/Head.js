import React from 'react';
import modal from "../../assets/modal.png";
import './Head.css';

function Head() {
  return (
    <div className='head-container'>
        <div className='logo'>
            <img src={modal} alt='logo'/>
        </div>
        <h1>Seja bem vindo ao AppLog!</h1>
    </div>
  )
}

export default Head;
