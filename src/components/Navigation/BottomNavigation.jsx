import { Link, useLocation } from "react-router-dom";
import { Grid2X2, History, Sparkles, User } from "lucide-react";

const items = [
  { to: "/dashboard", label: "HOME", icon: Grid2X2 },
  { to: "/history", label: "HISTORY", icon: History },
  { to: "/questions", label: "SOS", icon: Sparkles },
  { to: "/profile", label: "PROFILE", icon: User }
];

export default function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.to;
        return (
          <Link key={item.to} to={item.to} className={`nav-link ${active ? "active" : ""}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
