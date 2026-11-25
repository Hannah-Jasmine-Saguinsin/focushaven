import { NavLink } from "react-router-dom";
import "./Navigation.css";

const BASE = import.meta.env.BASE_URL;

const navigationItems = [
  { label: "Focus", icon: "focus.webp", path: "/" },
  { label: "Notes", icon: "notes.webp", path: "/notes" },
  { label: "Tasks", icon: "tasks.webp", path: "/tasks" },
  { label: "Insights", icon: "insights.webp", path: "/insights" },
  { label: "Studio", icon: "studio.webp", path: "/studio" },
  { label: "Settings", icon: "settings.webp", path: "/settings" },
];

export default function Navigation() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="FocusHaven home">
        <img
          src={`${BASE}branding/bloom.webp`}
          alt=""
          className="brand-logo"
        />

        <span className="brand-name">FocusHaven.</span>
      </NavLink>

      <nav className="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src={`${BASE}icons/${item.icon}`}
              alt=""
              className="nav-icon"
              draggable={false}
            />

            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}