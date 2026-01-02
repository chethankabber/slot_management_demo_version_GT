import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { CircleUserRound, PenSquare } from "lucide-react";
import api from "../../api/axios";
import NotificationToast from "../../components/common/NotificationToast";

const ManagerProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "manager",
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

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/manager/profile");
      setForm({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        role: res.data.data.role,
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save profile + password
  const handleSave = async () => {
    try {
      // Update profile
      await api.put("/manager/updateProfile", {
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      // Update password ONLY if filled
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

        await api.put("/manager/change-password", {
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        });
      }

      setToast({
        show: true,
        message: "Profile updated successfully",
        bg: "success",
      });

      setEditMode(false);
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      fetchProfile();
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
          maxWidth: 660,
          background: "hsl(215, 25%, 12%)",
          color: "white",
          borderRadius: 14,
          border: "1px solid hsl(215, 20%, 25%)",
          boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center p-4"
          style={{ borderBottom: "1px solid hsl(215,20%,22%)" }}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 54,
              height: 54,
              background: "hsl(215, 25%, 16%)",
              border: "2px solid hsl(215, 20%, 25%)",
              marginRight: 20,
            }}
          >
            <CircleUserRound size={30} />
          </div>

          <div style={{ flex: 1 }}>
            <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
              user name
            </div>
            <div style={{ color: "hsl(215,15%,75%)" }}>{form.role} (role)</div>
          </div>

          <Button variant="primary" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Done" : <PenSquare/>}
          </Button>
        </div>

        {/* Profile Form */}
        <Form className="p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value= "manager@demo.com"
                disabled={!editMode}
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value= "9988776655"
                disabled={!editMode}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value= "Manager Name"
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

          {/* PASSWORD UPDATE – ONLY WHEN EDIT MODE */}
          {editMode && (
            <>
              <hr style={{ borderColor: "hsl(215,20%,22%)" }} />
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

export default ManagerProfile;
