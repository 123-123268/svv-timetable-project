import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import TableFile from "./components/TableFile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/table"
          element={
            <ProtectedRoute>
              <TableFile />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
