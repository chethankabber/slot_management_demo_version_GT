// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import NotificationToast from "../components/common/NotificationToast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const showToast = (message, bg = "danger") => {
    setToast({ show: true, message, bg });
  };

const demoLogin = async (role) => {
  try {
    const res = await api.post("/auth/demo-login", { role });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("role", res.data.user.role);

    //ROUTES
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "manager") navigate("/manager/dashboard");
    else if (role === "user") navigate("/users/dashboard");

  } catch (err) {
    console.error(err);
    alert("Demo login failed");
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return showToast("Please enter your email", "danger");
    }

    if (!password.trim()) {
      return showToast("Please enter your password", "danger");
    }

    try {
      const response = await api.post("/auth/login", { email, password });

      // SUCCESS TOAST
      showToast("Login successful!", "success");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      const userRole = response.data.user.role;

      setTimeout(() => {
        if (userRole === "admin") navigate("/admin");
        else if (userRole === "manager") navigate("/manager");
        else if (userRole === "user") navigate("/users");
        else showToast("Unknown user role", "danger");
      }, 800);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Unable to login, try again!";
      showToast(errorMsg, "danger");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
        padding: "20px",
      }}
    >
      {/*Toast Notification */}
      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />

      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded"
        style={{
          backgroundColor: "hsl(215, 25%, 14%)",
          border: "1px solid hsl(215, 20%, 25%)",
          width: "100%",
          maxWidth: "800px",
          minHeight: "450px",
        }}
      >
        {/* LEFT SIDE LOGO SECTION */}
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center mb-4 mb-md-0"
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <img
            src="/demo_v.png"
            alt="Logo"
            style={{
              height: "200px",
              objectFit: "contain",
              marginBottom: "15px",
            }}
          />
        </div>

        {/* VERTICAL LINE */}
        <div
          className="d-none d-md-block"
          style={{
            width: "2px",
            backgroundColor: "hsl(215, 25%, 18%)",
            height: "300px",
            margin: "0 20px",
          }}
        ></div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="p-3" style={{ width: "100%", maxWidth: "350px" }}>
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <button

              className="btn w-100 mt-3"
              style={{
                backgroundColor: "hsl(210, 40%, 50%)",
                color: "hsl(215, 25%, 12%)",
                border: "1px solid hsl(215, 20%, 25%)",
                fontWeight: "600",
                padding: "10px",
              }}
            >
              Login
            </button>

            <button
              type="button"
              className="btn w-10 mt-3"
              style={{
                backgroundColor: "transparent",
                borderColor: "hsla(0, 96%, 50%, 1.00)",
                color: "hsla(67, 76%, 57%, 1.00)",
                border: "1px solid hsl(215, 20%, 25%)",
                fontWeight: "200",
                padding: "5px",
              }}
              onClick={() => demoLogin("admin")}>
              Admin Login
            </button>
            *
            <button
              type="button"
              className="btn w-10 mt-3"
              style={{
                backgroundColor: "transparent",
                borderColor: "hsla(0, 96%, 50%, 1.00)",
                color: "hsla(67, 76%, 57%, 1.00)",
                border: "1px solid hsl(215, 20%, 25%)",
                fontWeight: "200",
                padding: "5px",
              }}
              onClick={() => demoLogin("manager")}>
              Manager Login
            </button>
            *
            <button
              type="button"
              className="btn w-10 mt-3"
              style={{
                backgroundColor: "transparent",
                borderColor: "hsla(0, 96%, 50%, 1.00)",
                color: "hsla(67, 76%, 57%, 1.00)",
                border: "1px solid hsl(215, 20%, 25%)",
                fontWeight: "200",
                padding: "5px",
              }}
              onClick={() => demoLogin("user")}>
              User Login
            </button>



          </form>

          {/* <div
            className="text-center mt-3"
            style={{
              cursor: "pointer",
              color: "hsl(210, 40%, 80%)",
            }}
          >
            <p>
              Don’t have an account?{" "}
              <span
                className="text-info"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
