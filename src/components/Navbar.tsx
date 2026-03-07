import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Brain } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/interview", label: "Interview" },
  { to: "/quiz", label: "Quiz" },
  { to: "/progress", label: "Progress" },
  { to: "/profile", label: "Profile" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          SmartPrep
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={logout} className="ml-2 text-muted-foreground hover:text-destructive">
            <LogOut className="mr-1 h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-3 md:hidden">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                location.pathname === item.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={() => { logout(); setMobileOpen(false); }} className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
