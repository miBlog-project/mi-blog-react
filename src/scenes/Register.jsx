import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userInputs, setUserInputs] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = e => {
    setUserInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
      })
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      await axios.post("/auth/register", userInputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="email" placeholder="Email" name="email" onChange={handleInputChange} />
        <input required type="text" placeholder="Username" name="username" onChange={handleInputChange} />
        <input required type="password" placeholder="Password" name="password" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Already have account? <Link to="/login">Login here</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;