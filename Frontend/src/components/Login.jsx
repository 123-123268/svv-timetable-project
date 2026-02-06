import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ navigation hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    return setError("Email and password are required");
  }

  try {
    setLoading(true);
    await login(email, password); // 🔥 backend call
    navigate("/home");            // 🔥 redirect
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col rounded-xl bg-white p-8 shadow-lg w-96">
        <h4 className="text-xl font-semibold text-slate-800">Login</h4>
        <p className="text-slate-500 text-sm mb-6">
          Nice to meet you! Enter your details to login.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
              placeholder="Your Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-slate-400"
              placeholder="Your Password"
              autoComplete="current-password"
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-2 rounded-md text-sm hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="mt-5 text-sm text-center text-slate-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 font-semibold text-slate-700 underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
