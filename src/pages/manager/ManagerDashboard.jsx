// src/pages/manager/ManagerDashboard.jsx
import React, { useState, useEffect } from "react";
import { UserCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { DEMO_MODE } from "../../config/demo";
import { demoApprovedRequests } from "../../demo/managerDemoData";
import { demoContainers, demoLowStock } from "../../demo/adminDemoData";

import NotificationToast from "../../components/common/NotificationToast";

// Manager Components
import ManagerPermissionModal from "../../components/manager/ManagerPermissionModal";
import ContainerSummaryCard from "../../components/admin/dashboard/ContainerSummaryCard";
import ItemDueCard from "../../components/admin/dashboard/DueDatesCard";
import LowStockCard from "../../components/admin/dashboard/LowStockCard";
import PurchaseItemSection from "../../components/admin/dashboard/PurchaseItemSection";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const [approvedPermissions, setApprovedPermissions] = useState([]);
  const [racks, setRacks] = useState([]);

  const [showManagerModal, setShowManagerModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [lowStock, setLowStock] = useState([])
  const [purchaseRefreshKey, setPurchaseRefreshKey] = useState(0);
  
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const jumpToSlot = (rackId, slotNumber) => {
    navigate(`/manager/racks?jumpRack=${rackId}&jumpSlot=${slotNumber}`);
  };
  
const loadLimitedStock = async () => {
  // ✅ DEMO MODE
  if (DEMO_MODE) {
    setLowStock(demoLowStock);
    return;
  }

  try {
    const res = await api.get("/manager/limitedStock");
    setLowStock(res.data.data || []);
  } catch (err) {
    console.error("Failed to fetch limited stock:", err);
  }
};


  const loadApproved = async () => {
  // ✅ DEMO MODE
  if (DEMO_MODE) {
    setApprovedPermissions(demoApprovedRequests);
    return;
  }

  // 🔵 REAL MODE
  try {
    const res = await api.get("/manager/getApprovedRequests");
    setApprovedPermissions(res.data.data || []);
  } catch (err) {
    console.error("Failed to fetch approved:", err);
  }
};

const loadRacks = async () => {
  // ✅ DEMO MODE
  if (DEMO_MODE) {
    setRacks(demoContainers);
    return;
  }

  // 🔵 REAL MODE
  try {
    const res = await api.get("/racks/getAllRacks");
    setRacks(res.data.data || []);
  } catch (err) {
    console.error("Failed to fetch racks:", err);
  }
};



const loadData = async () => {
  await Promise.all([
    loadApproved(),
    loadRacks(),
    loadLimitedStock(),
  ]);
  setPurchaseRefreshKey(prev => prev + 1);
};

useEffect(() => {
  loadData();
}, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">Manager Dashboard</h2>
      <p className="text-muted">Manage racks & issue items to users</p>

      {/* Approved Permissions */}
      <div className="card p-3 mb-4 bg-dark text-white">
        <h5 className="fw-bold mb-3">Pending Item to Issue</h5>

        {approvedPermissions.length === 0 ? (
          <p className="text-muted">No approved pending permissions.</p>
        ) : (
          approvedPermissions.map((req) => (
            <div
              key={req._id}
              className="p-3 mb-3 rounded d-flex"
              style={{
                backgroundColor: "#1b2430",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onClick={() => {
                setSelectedReq(req);
                setShowManagerModal(true);
              }}
            >
              {/* LEFT SIDE */}
              <div className="d-flex align-items-center gap-3" style={{ width: "33%" }}>
                <UserCircle size={30} className="text-primary" />
                <div>
                  <div className=" text-white">{req.user.name}</div>

                  <div
                    className="text-muted"
                    style={{
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Mail size={16} />
                    {req.user.email}
                  </div>
                </div>
              </div>

              {/* CENTER */}
              <div
                style={{
                  width: "34%",
                  textAlign: "center",
                  color: "white",
                  
                  fontSize: "0.95rem",
                }}
              >
                <div>Item: {req.itemName}</div>
                <div>Qty: {req.quantity}</div>
              </div>

              {/* RIGHT SIDE */}
              <div
                style={{
                  width: "33%",
                  textAlign: "right",
                  color: "#7b7d7eff",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                Details →
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rack Summary */}
      <div className="row g-3 mb-4">
        {racks.map((rack) => (
          <div key={rack._id} className="col-sm-6 col-lg-4">
            <ContainerSummaryCard container={rack} basePath="/manager/racks" />
          </div>
        ))}
      </div>

      {/* Stock Alerts */}
      <div className="row g-4">
        <div className="col-lg-6">
          <ItemDueCard  />
        </div>
        <div className="col-lg-6">
          <LowStockCard lowStock={lowStock} onJumpToSlot={jumpToSlot} />
        </div>
      </div>

      <div className="mt-5 p-5 col-lg-12">  
         <PurchaseItemSection onRefresh={loadData} refreshKey={purchaseRefreshKey} />
       </div>
      {/* Modal */}
      {showManagerModal && (
        <ManagerPermissionModal
          show={showManagerModal}
          onClose={() => setShowManagerModal(false)}
          request={selectedReq}
          onGiven={() => {
            loadApproved();
            loadRacks();
            loadLimitedStock();
            setToast({
              show: true,
              message: "Item successfully issued!",
              bg: "success",
            });
          }}
          onRefresh={loadData}
        />
      )}

      {/* Toast */}
      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </div>
  );
};

export default ManagerDashboard;
