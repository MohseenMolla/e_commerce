import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Home,
  LogIn,
  UserPlus,
  ShoppingCart,
  Store,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-10 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black flex items-center gap-2">
            <Home size={18} /> Home
          </Link>

         

          {!user && (
            <>
              <Link to="/login" className="hover:text-black flex items-center gap-2">
                <LogIn size={18} /> Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <UserPlus size={18} /> Register
              </Link>
            </>
          )}

          {user && (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-black flex items-center gap-2">
                  <ShieldCheck size={18} /> Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 h-[80px] border-b">
          <img src="/logo.png" className="h-8" />
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          

          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}

          {user && (
            <>
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)}>
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
    </header>
  );
}
