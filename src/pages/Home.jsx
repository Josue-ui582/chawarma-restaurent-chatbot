import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1 className="welcome-title">Bienvenue chez Shawarma Bot !</h1>
        <p className="welcome-text">
          Découvrez l'univers savoureux de nos délicieux shawarmas. 
          Je suis votre assistant virtuel, prêt à répondre à toutes vos questions, 
          vous guider dans notre menu et rendre votre expérience mémorable !
        </p>

        <p className="welcome-subtext">
          Cliquez ci-dessous pour commencer une aventure gourmande avec votre assistant Shawarma Bot !
        </p>

        <Link to="/chatbot" className="chat-link">
          🚀 Démarrer le Chat
        </Link>
      </div>
    </div>
  );
}

export default Home;