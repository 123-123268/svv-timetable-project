import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-14 px-6 flex items-center justify-between border-b bg-white">
      {/* Left */}
      <h1 className="text-lg font-semibold">Time Table Manager</h1>

      {/* Right */}
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

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            <div className="px-4 py-3 text-sm text-gray-700 border-b">
              user@email.com
            </div>
            <button
              onClick={() => alert("Logging out...")}
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
