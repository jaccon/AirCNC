import React, { useState } from 'react';
import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return (
    <>
     
     <div className="container">
     
        <Header />

        <div className="content">

          <p className="header">
            Informe o seu endereço de e-mail corporativo para cadastrar
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>

          </form>
          
        </div>
      </div>
    </>
  )
}