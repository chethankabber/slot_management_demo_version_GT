import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { DEMO_MODE } from "../../config/demo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const UniversalLayout = ({ role }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
  // DEMO MODE → DO NOT CALL BACKEND
  if (DEMO_MODE) {
    const demoUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(demoUser);
    return;
  }

  try {
    const res = await api.get("/users/profile");
    setCurrentUser(res.data.data);
  } catch (err) {
    console.error("Failed to load user", err);
  }
};

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="d-flex position-relative"
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
        overflow: "hidden",
      }}
    >
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
      />

      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isMobile ? 0 : sidebarOpen ? "240px" : "70px",
          width: "100%",
        }}
      >
        <Navbar
          role={role}
          data={currentUser}
          onMenuClick={toggleSidebar}
          isMobile={isMobile}
        />

        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            overflowY: "auto",
          }}
        >
          {/* ⬇ Pass both state and setter to children */}
          <Outlet context={{ currentUser, setCurrentUser }} />
        </main>
      </div>
    </div>
  );
};

export default UniversalLayout;
