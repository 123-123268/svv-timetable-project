import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // adjust path

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Email and password are required");
    }

    try {
      setLoading(true);
      await signup(email, password); // 🔥 global signup
      navigate("/home");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col rounded-xl p-8 shadow-lg">
        <h4 className="text-xl font-medium text-slate-800">Sign Up</h4>
        <p className="text-slate-500 font-light">
          Nice to meet you! Enter your details to register.
        </p>

        <form
          onSubmit={submitForm}
          className="mt-8 w-80 sm:w-96 space-y-6"
        >
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

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
