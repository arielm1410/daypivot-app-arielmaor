import { Grid2X2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="topbar">
      <Link to="/dashboard" className="logo-row">
        <Grid2X2 size={20} />
        <span>DayPivot</span>
      </Link>
      <Link to="/settings" className="avatar" aria-label="Settings">
        <Settings size={18} />
      </Link>
    </header>
  );
}
