import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { userLogin } = useContext(AuthContext);

  const handleInputChange = e => {
    setUserInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
      })
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (userInputs.username && userInputs.password) {
      try {
        await userLogin(userInputs);
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      }    
    } else {
      setError("Input fields cannot be empty");
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Username" name="username" onChange={handleInputChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>No account? <Link to="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;