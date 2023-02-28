import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/miBlog-logo.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="miBlog logo" />
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h4>ART</h4>
          </Link>
          <Link className="link" to="/?cat=crypto">
            <h4>CRYPTO</h4>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h4>TECHNOLOGY</h4>
          </Link>
          <Link className="link" to="/?cat=food">
            <h4>FOOD</h4>
          </Link>
          <Link className="link" to="/?cat=other">
            <h4>OTHER</h4>
          </Link>
          <span className="write">
            <Link className="link" to="/write">Write✒️</Link>
          </span>
          <span>Username</span>
          <span>Logout ⏏︎</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;