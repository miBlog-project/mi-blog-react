import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/miBlog-logo.png';

const Navbar = () => {
  const { currentUser, userLogout } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = () => {
    userLogout();
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={logo} alt="miBlog logo" />
          </Link>
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
          <Link className="link" to="/profile">
            <span>{ currentUser?.username }</span>
          </Link>
          {currentUser ? (
            <span onClick={logout}>Logout ⏏︎</span>
          ) : (
            <Link className="link" to="/login">
              Login ⎋
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;