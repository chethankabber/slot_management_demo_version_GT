// src/components/common/Sidebar.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom"; //useLocation gives you the current URL information (path, query params, etc.).
import {
  LayoutDashboard,
  Package,
  History,
  Users,
  UserCheck,
  ChevronLeft,
} from "lucide-react";
import { Button } from "react-bootstrap";

// MENU ITEMS (note dashboard uses /users/dashboard)
const navMenus = {
  admin: [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Racks", url: "/admin/racks", icon: Package },
    { title: "History", url: "/admin/history", icon: History },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "My Profile", url: "/admin/profile", icon: UserCheck },
  ],

  manager: [
    { title: "Dashboard", url: "/manager/dashboard", icon: LayoutDashboard },
    { title: "Racks", url: "/manager/racks", icon: Package },
    { title: "History", url: "/manager/history", icon: History },
    { title: "Users", url: "/manager/users", icon: Users },
    { title: "My Profile", url: "/manager/profile", icon: UserCheck },
  ],

  user: [
    { title: "Dashboard", url: "/users/dashboard", icon: LayoutDashboard },
    // { title: "Racks", url: "/users/racks", icon: Package },
    { title: "My History", url: "/users/history", icon: History },
    { title: "My Profile", url: "/users/profile", icon: UserCheck },
  ],
};




const Sidebar = ({ role = "user", isOpen, onClose }) => {
  const location = useLocation();
  const navItems = navMenus[role] || [];

  return (
    <>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          onClick={onClose}
          style={{ zIndex: 1090 }}
        />
      )}

      <aside
        className="position-fixed top-0 start-0 h-100 d-flex flex-column shadow-sm"
        style={{
          width: isOpen ? "240px" : "70px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "width 0.3s ease, transform 0.3s ease",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
          borderRight: "1px solid hsl(215,20%,25%)",
          color: "white",
          zIndex: 1100,
        }}
      >
        <div
          className="px-3 py-3 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1px solid hsl(215,20%,25%)" }}
        >
          {isOpen && (
            <h6 className="text-muted text-uppercase mb-0" style={{ fontFamily: "Merriweather, serif" }}>
              Slot Management
            </h6>
          )}

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onClose}
            className="rounded-circle border-0"
            style={{ width: 30, height: 30, background: "hsl(215,25%,14%)", color: "white" }}
          >
            <ChevronLeft size={16} className={!isOpen ? "rotate-180" : ""} style={{ transition: "transform 0.3s ease" }} />
          </Button>
        </div>

        <nav className="flex-grow-1 px-2 py-2 overflow-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            // active if exact or nested (e.g. /users/dashboard or /users/dashboard/123)
            const isActive =
              location.pathname === item.url ||
              location.pathname.startsWith(item.url + "/");

            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={`d-flex align-items-center rounded py-2 px-3 mb-1 ${
                  isActive ? "bg-primary fw-semibold text-white" : "text-light"
                } ${!isOpen ? "justify-content-center" : "gap-2"}`}
                title={!isOpen ? item.title : ""}
                onClick={() => {
                  if (window.innerWidth < 992) onClose();
                }}
                style={{ transition: "background-color 0.2s ease" }}
              >
                <Icon size={18} />
                {isOpen && item.title}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
