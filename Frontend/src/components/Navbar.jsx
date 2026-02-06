import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth(); // ✅ get user
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log("Navbar user:", user);

  return (
    <nav className="w-full h-14 px-6 flex items-center justify-between border-b bg-white">
      <h1 className="text-lg font-semibold">Time Table Manager</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full overflow-hidden border"
        >
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </button>

        {open && user && (
          <div className="absolute right-0 mt-2 w-52 bg-white border rounded-md shadow-lg">
            <div className="px-4 py-3 text-sm text-gray-700 border-b">
              {user?.email || "Loading..."}

            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
