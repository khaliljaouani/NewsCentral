import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">News Central</h1>
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/history">Historique</Link>
      </nav>
    </header>
  );
};

export default Header;
