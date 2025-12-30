// src/components/common/UniversalNavbar.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ role = "user", data = {}, onMenuClick, isMobile }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  const getInitials = (name) => {
    if (!name) return role === "admin" ? "A" : role === "manager" ? "M" : "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>


      <header
        className="border-bottom shadow-sm py-3 px-3 px-md-4 position-sticky top-0 w-100 fixed-top"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          borderBottom: "1px solid hsl(215, 20%, 25%)",
          zIndex: 1055,
          transition: "all 0.3s ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <button
              className="btn btn-outline-secondary d-lg-none p-2"
              onClick={onMenuClick}
              title="Toggle Sidebar"
              style={{
                backgroundColor: "hsl(215, 25%, 14%)",
                borderColor: "hsl(215, 20%, 25%)",
                color: "hsl(210, 40%, 98%)",
              }}
            >
              <Menu size={20} />
            </button>

            <div className="d-flex align-items-center gap-2">
              <img
                src="/Demo_logo.png"
                alt="Logo"
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "8px",
                  objectFit: "contain",
                }}
              />
              
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
            {(role === "admin" || role === "manager") && (
              <>
                <div className="text-end d-none d-md-block">
                  <p className="mb-0 fw-semibold text-light">
                    {data?.name || (role === "admin" ? "Admin" : "Manager")}
                  </p>
                  <small className="text-muted">
                    {data?.email ||
                      (role === "admin"
                        ? "admin@gmail.com"
                        : "manager@gmail.com")}
                  </small>
                </div>

                <div
                  className={`rounded-circle text-white border d-flex justify-content-center align-items-center fw-bold ${role === "admin"
                      ? "bg-primary border-primary"
                      : "bg-info border-info"
                    }`}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "14px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {getInitials(data?.name)}
                </div>
              </>
            )}

            {/* USER SECTION */}
            {role === "user" && (
              <>
                <div className="text-end d-none d-md-block">
                  <p className="mb-0 fw-semibold text-light">
                    {data?.name || "User"}
                  </p>
                  {/* <small className="text-muted">
                  {data?.email || "user@gmail.com"}
                </small> */}
                </div>

                <div
                  className="rounded-circle text-white border d-flex justify-content-center align-items-center fw-bold bg-primary border-primary"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "14px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {getInitials(data?.name)}
                </div>
              </>
            )}

            <button
              className="btn btn-outline-danger p-2 d-flex align-items-center justify-content-center"
              title="Logout"
              style={{
                borderColor: "hsl(0, 72%, 51%)",
                color: "hsl(0, 72%, 51%)",
              }}
              onClick={() => setShowLogoutModal(true)}

            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
