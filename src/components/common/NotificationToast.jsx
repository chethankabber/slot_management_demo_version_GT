// src/components/common/NotificationToast.jsx
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationToast = ({ show, onClose, message, bg = "success" }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        onClose={onClose}
        show={show}
        delay={2500}
        autohide
        bg={bg}
        style={{
          color: "white",
          fontWeight: "bold",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        <Toast.Body><i className="bi bi-exclamation-triangle me-2">{message}</i></Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default NotificationToast;
