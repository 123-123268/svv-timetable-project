import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState([]);
  const [homeloading, sethomeLoading] = useState(true);
  const [error, setError] = useState("");

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

  const fetchFiles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/files/getallfiles"
        );
        setFiles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load files");
      } finally {
        sethomeLoading(false);
      }
  };
  const createFile=async (filename)=>{
    try {
      const author_email=user.email;
      const res = await axios.post(
        "http://localhost:3000/files/createfile",
        {filename,author_email}
      );
      fetchFiles();
      // setFiles((prevFiles) => [res.data.file, ...prevFiles]);
    } catch (err) {
      console.error(err);
      setError("Failed to create file");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn,signup, login, logout,fetchFiles,files,homeloading,error,setError,sethomeLoading,setFiles,createFile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
