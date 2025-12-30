import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-danger mb-3">404 - Page Not Found</h1>
      <p className="text-muted mb-4">Page is not !!!.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
