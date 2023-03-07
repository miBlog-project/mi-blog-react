import { createContext, useState, useEffect  } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || "");

  const userLogin = async (userInputs) => {
    const res = await axios.post("/auth/login", userInputs);
    setCurrentUser(res.data);
  }

  const userLogout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser("");
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, userLogin, userLogout }}>
      { children }
    </AuthContext.Provider>
  );
}