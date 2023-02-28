import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/miBlog-logo.png';

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="miBlog logo" />
      <div className="links">
        <span>
          <Link className="link" to="/about">About</Link>
        </span>
        <span>
          <a className="link" href="https://github.com/">GitHub</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;