import { Link, NavLink } from "react-router";
import { Search, Home, PlayCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-theme bg-base-100/80 border-b border-base-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
          ANIKII
        </Link>
        
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}>
            <Home size={20} />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `flex items-center gap-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`}>
            <Search size={20} />
            <span className="hidden sm:inline">Search</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
