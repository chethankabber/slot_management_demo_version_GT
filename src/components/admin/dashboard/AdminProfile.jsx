import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CircleUserRound, PenSquare } from "lucide-react";
import api from "../../../api/axios";
import NotificationToast from "../../../components/common/NotificationToast";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  // Fetch admin profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/admin/profile");
      setForm({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        phone: res.data.data.phone || "",
        role: res.data.data.role || "admin",
      });
    } catch (err) {
      setToast({
        show: true,
        message: "Failed to load admin profile",
        bg: "danger",
      });
    }
  };

  

  // Save profile + password
  const handleSave = async () => {
    try {
      // Validate basic profile
      if (!form.name || !form.email) {
        setToast({
          show: true,
          message: "Name and email are required",
          bg: "warning",
        });
        return;
      }

      // Update profile
      await api.put("/admin/updateProfile", {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      // Update password only if fields are filled
      if (
        passwordForm.oldPassword ||
        passwordForm.newPassword ||
        passwordForm.confirmPassword
      ) {
        if (
          !passwordForm.oldPassword ||
          !passwordForm.newPassword ||
          !passwordForm.confirmPassword
        ) {
          setToast({
            show: true,
            message: "Fill all password fields",
            bg: "warning",
          });
          return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
          setToast({
            show: true,
            message: "Passwords do not match",
            bg: "danger",
          });
          return;
        }

        await api.put("/admin/change-password", {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        });
      }

      setToast({
        show: true,
        message: "Admin profile updated successfully",
        bg: "success",
      });

      setEditMode(false);
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
     
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Update failed",
        bg: "danger",
      });
    }
  };

  return (
    <div className="container my-4">
      <NotificationToast
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />

      <div
        className="card mx-auto"
        style={{
          maxWidth: 700,
          background: "#0F1623",
          color: "white",
          borderRadius: 14,
          border: "1px solid #2A3A4B",
          boxShadow: "0 6px 30px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center p-4"
          style={{ borderBottom: "1px solid #2A3A4B" }}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 54,
              height: 54,
              background: "#1C2736",
              border: "2px solid #2A3A4B",
              marginRight: 20,
            }}
          >
            <CircleUserRound size={30} />
          </div>

          <div style={{ flex: 1 }}>
            <div className="fw-bold" style={{ fontSize: "1.25rem" }}>
              {form.name || "User Name"}
            </div>
            <div style={{ opacity: 0.7 }}>{form.role} (role)</div>
          </div>

          <Button variant="primary" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : <PenSquare /> }
          </Button>
        </div>

        {/* Profile Form */}
        <Form className="p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value="admin@demo.com"
                disabled
                // disabled={!editMode}
                // onChange={(e) =>
                //   setForm({ ...form, email: e.target.value })
                //}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value="8877990011"
                disabled={!editMode}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value="Admin name"
                disabled={!editMode}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control value="********" disabled />
            </div>
          </div>

          {/* PASSWORD UPDATE – SAME EDIT BUTTON */}
          {editMode && (
            <>
              <hr style={{ borderColor: "#2A3A4B" }} />
              <h6 className="mb-3">Update Password</h6>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        oldPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {editMode && (
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditMode(false);
                  setPasswordForm({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default AdminProfile;
