// src/pages/dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import ContainerSummaryCard from "./ContainerSummaryCard";
import PermissionRequests from "./PermissionRequests";
import ItemDueCard from "./DueDatesCard";
import LowStockCard from "./LowStockCard";
import NotificationToast from "../../common/NotificationToast";
import PurchaseItemSection from "./PurchaseItemSection";
import { demoRacks } from "../../../demo/demoRacks";
import { DEMO_MODE } from "../../../config/demo";
import {
  demoContainers,
  demoPermissionRequests,
  demoLowStock,
} from "../../../demo/adminDemoData";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [containers, setContainers] = useState([]);
  const [permissionRequests, setPermissionRequests] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  /* Load Dashboard Data */
  const loadData = async () => {

    // ✅ DEMO MODE
    if (DEMO_MODE) {
      setContainers(demoContainers);
      setPermissionRequests(demoPermissionRequests);
      setLowStock(demoLowStock);
      setContainers(demoRacks);
      return;
    }

    // 🔵 REAL MODE
    try {
      const [conRes, reqRes, lowRes] = await Promise.all([
        api.get("/racks/getAllRacks"),
        api.get("/requests/AllRequests"),
        api.get("/manager/limitedStock"),
      ]);

      setContainers(conRes.data.data || []);
      setPermissionRequests(reqRes.data.data || []);
      setLowStock(lowRes.data.data || []);
    } catch (err) {
      console.error("AdminDashboard Load Error:", err);
    }
  };
  useEffect(() => {
  loadData();
}, []);

  

  /* Approve Request */
  const onApprove = async (id) => {

    // ✅ DEMO MODE
    if (DEMO_MODE) {
      setPermissionRequests(prev =>
        prev.filter(req => req._id !== id)
      );

      setToast({
        show: true,
        message: "Request Approved (Demo)",
        bg: "success",
      });
      return;
    }

    // 🔵 REAL MODE (keep existing backend logic)
  };


  /* Reject Request */
  const onReject = async (id) => {

  // ✅ DEMO MODE
  if (DEMO_MODE) {
    setPermissionRequests(prev =>
      prev.filter(req => req._id !== id)
    );

    setToast({
      show: true,
      message: "Request Rejected (Demo)",
      bg: "danger",
    });
    return;
  }

  // 🔵 REAL MODE
};


  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-1">Admin Dashboard</h2>
      <p className="text-muted">Overview of your container management</p>

      {/* Pending Permission Requests */}
      <div className="mb-4">
        {permissionRequests.length ? (
          <PermissionRequests
            permissionRequests={permissionRequests}
            onApprove={onApprove}
            onReject={onReject}
          />
        ) : (
          <p className="text-muted">No pending requests</p>
        )}
      </div>

      {/* Container Summary */}
      <div className="row g-4 mb-4">
        {containers.map((container) => (
          <div key={container._id} className="col-12 col-sm-6 col-lg-4">
            <ContainerSummaryCard
              container={container}
              basePath="/admin/racks"
            />
          </div>
        ))}
      </div>

      {/* Low Stock + Due Dates Cards */}
      <div className="row g-4">
        <div className="col-lg-6">
          <ItemDueCard containers={containers} />
        </div>

        <div className="col-lg-6">
          <LowStockCard
            lowStock={lowStock}
            onJumpToSlot={(rackId, slot) =>
              navigate(`/admin/racks?jumpRack=${rackId}&jumpSlot=${slot}`)
            }
          />
        </div>
      </div>

      <div className="mt-5 p-5 col-lg-12">
        <PurchaseItemSection onRefresh={loadData} />
      </div>
      {/* Toast Notification */}
      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </div>
  );
};

export default AdminDashboard;
