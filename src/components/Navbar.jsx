import { ShoppingCart, Menu, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
          <Dumbbell className="text-indigo-600" />
          <span>ProteinHub</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <a href="#shop" className="hover:text-gray-900">Shop</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/" className="relative">
            <ShoppingCart />
            <span className="sr-only">Cart</span>
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-sm text-gray-700">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <a href="#shop" onClick={() => setOpen(false)}>Shop</a>
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
