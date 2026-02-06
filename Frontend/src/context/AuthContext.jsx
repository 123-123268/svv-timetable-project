import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

const login = async (email, password) => {
    const res = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });

    // backend returns: { message, user }
    setUser(res.data.user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };
const signup = async (email, password) => {
    const res = await axios.post("http://localhost:3000/users/signup", {
      email,
      password,
    });

    // optional: auto-login after signup
    setUser(res.data.user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn,signup, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/* 🔥 THIS EXPORT WAS MISSING OR WRONG */
export const useAuth = () => {
  return useContext(AuthContext);
};
