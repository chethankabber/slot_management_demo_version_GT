// src/pages/AllUsers.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axios";
import NotificationToast from "../components/common/NotificationToast";
import { DEMO_MODE } from "../config/demo";
import { demoAdminUsers } from "../demo/demoAdminUsers";

import {
  User,
  Mail,
  Shield,
  Calendar,
  Trash2,
  PlusCircle,
  Key,
  Copy,
} from "lucide-react";

/* ---------------- PASSWORD GENERATOR ---------------- */
const generatePassword = (length = 12) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%&*()_=+[]{}";
  const all = upper + lower + digits + symbols;

  let pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  for (let i = pwd.length; i < length; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }

  return pwd.sort(() => Math.random() - 0.5).join("");
};

const AllUsers = () => {
  /* ---------------- STATE ---------------- */
  const [users, setUsers] = useState(() => {
    if (DEMO_MODE) {
      return demoAdminUsers.map((u) => ({
        ...u,
        joinDate: u.joined.split("T")[0],
      }));
    }
    return [];
  });

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
 const [editMode, setEditMode] = useState(false);
 const [editUserId, setEditUserId] = useState(null);
 const [deleteUserId, setDeleteUserId] = useState(null);
 const [deleteUserName, setDeleteUserName] = useState("");



  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "User",
    phone: "",
  });

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  /* ---------------- LOAD USERS (REAL MODE) ---------------- */
  useEffect(() => {
    if (DEMO_MODE) return;

    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/getAllUsers");
        const formatted = res.data.data.map((u) => ({
          ...u,
          joinDate: u.joined ? u.joined.split("T")[0] : "-",
        }));
        setUsers(formatted);
      } catch {
        setToast({
          show: true,
          message: "Failed to load users",
          bg: "danger",
        });
      }
    };

    fetchUsers();
  }, []);

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.trim()) e.email = "Email required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone required";
    return e;
  };

  const resetForm = () => {
    setForm({ id: null, name: "", email: "", role: "User", phone: "" });
    setGeneratedPassword("");
    setShowPassword(false);
    setErrors({});
  };

  /* ---------------- ADD / EDIT USER ---------------- */
  const handleUserSubmit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const role = form.role.toLowerCase();

    /* -------- EDIT -------- */
    if (editMode) {
      if (DEMO_MODE) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === form.id
              ? { ...u, name: form.name, email: form.email, phone: form.phone, role }
              : u
          )
        );

        setToast({ show: true, message: "User updated (Demo)", bg: "success" });
      } else {
        await api.put(`/admin/editUser/${form.id}`, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          role,
        });

        setUsers((prev) =>
          prev.map((u) =>
            u._id === form.id
              ? { ...u, name: form.name, email: form.email, phone: form.phone, role }
              : u
          )
        );

        setToast({ show: true, message: "User updated ✔", bg: "success" });
      }
    }
    /* -------- ADD -------- */
    else {
      if (DEMO_MODE) {
        const newUser = {
          _id: `demo-${Date.now()}`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          role,
          joinDate: new Date().toISOString().split("T")[0],
        };

        setUsers((prev) => [newUser, ...prev]);
        setToast({ show: true, message: "User added (Demo)", bg: "success" });
      } else {
        const res = await api.post("/admin/addUser", {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: generatedPassword || generatePassword(),
          role,
        });

        const newUser = {
          ...res.data.data,
          joinDate: res.data.data.joined.split("T")[0],
        };

        setUsers((prev) => [newUser, ...prev]);
        setToast({ show: true, message: "User added ✔", bg: "success" });
      }
    }

    resetForm();
    setEditMode(false);
    setShowModal(false);
  };

  /* ---------------- DELETE USER ---------------- */
  const confirmDelete = (id, name) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (DEMO_MODE) {
      setUsers((prev) => prev.filter((u) => u._id !== deleteUserId));
      setToast({ show: true, message: "User removed (Demo)", bg: "success" });
      setShowDeleteModal(false);
      return;
    }

    try {
      await api.delete(`/admin/deleteUser/${deleteUserId}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteUserId));
      setToast({ show: true, message: "User removed!", bg: "success" });
    } catch {
      setToast({ show: true, message: "Delete failed", bg: "danger" });
    }

    setShowDeleteModal(false);
  };

  /* ---------------- JSX (UNCHANGED) ---------------- */
  return (
  <div className="container my-4">
      <NotificationToast show={toast.show} message={toast.message} bg={toast.bg}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))} />
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2>All Users</h2>
          <p className="text-muted mb-0">Manage user permissions</p>
        </div>

        <div className="d-flex gap-2 align-items-center">

          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setEditMode(false);
              setShowModal(true);
            }}
          >
            <PlusCircle size={16} className="me-2" />
            Add User
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="d-flex flex-column gap-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="card p-3 shadow-sm"
            style={{ backgroundColor: "#141A28" }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              {/* USER INFO */}
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: 45, height: 45, backgroundColor: "#1E2635" }}
                >
                  <User />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{user.name}</h6>
                  <small className="text-muted">
                    <Mail size={14} /> {user.email}
                  </small>
                  <br />
                  <small className="text-muted">📞 {user.phone}</small>
                </div>
              </div>

              {/* ROLE + DATE */}
              <div className="text-end">
                <div className="d-flex justify-content-end gap-2 small">
                  <Shield size={14} /> {user.role}
                </div>
                <div className="d-flex align-items-center justify-content-end gap-2 text-muted small">
                  <Calendar size={14} />
                  Joined: {user.joinDate}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setEditMode(true);
                    setEditUserId(user._id);
                    setForm({
                      id: user._id,
                      name: user.name,
                      email: user.email,
                      role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                      phone: user.phone,
                    });
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => confirmDelete(user._id, user.name)}
                >
                  <Trash2 size={14} className="me-1" />
                  {/* Remove */}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleUserSubmit}>
                <div className="modal-header">
                  <h5>{editMode ? "Edit User" : "Add User"}</h5>
                  <button
                    type="button"
                    className="btn-close text-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label>Name</label>
                      <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Role</label>
                      <select
                        className="form-select"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                      >
                        <option>User</option>
                        <option>Manager</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>

                    {!editMode && (
                      <div className="col-12">
                        <label>Password (Auto)</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={generatedPassword}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              setGeneratedPassword(generatePassword());
                              setShowPassword(true);
                            }}
                          >
                            <Key size={14} className="me-1 text-white" /> Generate
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            disabled={!generatedPassword}
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(generatedPassword);
                                setToast({
                                  show: true,
                                  message: "Password copied",
                                  bg: "success",
                                });
                              } catch (err) {
                                setToast({
                                  show: true,
                                  message: "Copy failed",
                                  bg: "danger",
                                });
                              }
                            }}
                          >
                            <Copy className="me-1 text-white" size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                <div className="modal-footer">
                  <button   type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button   type="button" className="btn btn-primary" type="submit">
                    {editMode ? "Save Changes" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "#1B2230", color: "#fff" }}>
              <div className="modal-header">
                <h5>Delete Confirmation</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body text-center ">
                <p>Are you sure you want to delete : <strong className="text-white">{deleteUserName} ?</strong> </p>
                {/* <h6 className="fw-bold className="text-primary"">{deleteUserName}</h6> */}
                <p className="text-muted small mt-3">This action cannot be undone!</p>
              </div>
              <div className="modal-footer justify-content-center gap-3">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteUser}>
                  <Trash2 size={14} className="me-1" /> Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


export default AllUsers;