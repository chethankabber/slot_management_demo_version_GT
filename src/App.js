// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


/* Auth */
import Login from "./auth/Login";

/* Layouts */
import UniversalLayout from "./components/common/UniversalLayout";

/* User pages */
import UserRacks from "./pages/users/UserRacks";
import UserHistory from "./pages/users/UserHistory";
import UserProfile from "./pages/users/UserProfile";
import UniversalDashboard from "./pages/dashboard/UniversalDashboard";

/* Admin pages */
import Containers from "./pages/Containers";
import History from "./pages/History";
import AllUsers from "./pages/AllUsers";
import AdminDashboard from "./components/admin/dashboard/AdminDashboard";
import AdminProfile from "./components/admin/dashboard/AdminProfile";


/* Manager pages */
import ManagerRacks from "./pages/manager/ManagerRacks";
import ManagerHistory from "./pages/manager/ManagerHistory";
import ManagerUsers from "./pages/manager/ManagerUsers";
import ManagerProfile from "./pages/manager/ManagerProfile";
import ManagerDashboard from "./pages/manager/ManagerDashboard";

/* Common */
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* USER ROUTES */}
      <Route path="/users/*" element={<UniversalLayout role="user" />}>
        <Route path="dashboard" element={<UniversalDashboard role="user" />} />
        <Route path="racks" element={<UserRacks />} />
        <Route path="history" element={<UserHistory />} />
        <Route path="profile" element={<UserProfile />} />
        <Route index element={<Navigate to="/users/dashboard" replace />} />
      </Route>

      {/* ADMIN ROUTES */}
       <Route path="/admin/*" element={<UniversalLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="racks" element={<Containers />} />
          <Route path="history" element={<History />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
       </Route>

      {/* MANAGER ROUTES */}
       <Route path="/manager/*" element={<UniversalLayout role="manager" />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="racks" element={<ManagerRacks />} />
          <Route path="history" element={<ManagerHistory />} />
          <Route path="users" element={<ManagerUsers />} />
          <Route path="profile" element={<ManagerProfile />} />
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
       </Route>


      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
