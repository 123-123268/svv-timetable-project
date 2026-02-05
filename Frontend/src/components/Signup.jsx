import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate(); // ✅ correct hook usage

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    try {
      const url = "http://localhost:3000/users/signup";
      const response = await axios.post(url, { email, password });

      console.log("Signup successful:", response.data);
      navigate("/home"); // ✅ correct navigation
    } catch (error) {
      console.error("Signup error:", error);

      // Better error message
      if (error.response) {
        alert(error.response.data.message || "Signup failed");
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col rounded-xl p-8 shadow-lg">
        <h4 className="text-xl font-medium text-slate-800">Sign Up</h4>
        <p className="text-slate-500 font-light">
          Nice to meet you! Enter your details to register.
        </p>

        <div className="mt-8 w-80 sm:w-96 space-y-6">
          <div>
            <label className="block mb-2 text-sm text-slate-600">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700"
            onClick={submitForm}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
