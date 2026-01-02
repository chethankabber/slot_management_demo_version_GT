// src/pages/dashboard/UniversalDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import api from "../../api/axios";
import NotificationToast from "../../components/common/NotificationToast";
import { DEMO_MODE } from "../../config/demo";


/* ==== User Components ==== */
import UserBorrowedItems from "../users/UserBorrowedItems";
import { Button } from "react-bootstrap";
import RequestItemModal from "../users/RequestItemModal";
import MyRequests from "../users/MyRequests";

/* Demo mode */
import { demoRequests } from "../../demo/demoData";


const UniversalDashboard = ({
  role,
  containers = [],
  permissionRequests = [],
  approvedPermissions = [],
  onPermissionApprove,
  onPermissionReject,
  currentUser,
}) => {
  const navigate = useNavigate();

  /* USER STATES */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userRequests, setUserRequests] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [toast, setToast] = useState({
  show: false,
  message: "",
  bg: "success"
   });


     /* Load User Requests */
  const loadRequests = async () => {
    try {
      const res = await api.get("/users/requests");
      setUserRequests(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch requests:", err);
    }
  };


  /* Load User Requests */
  useEffect(() => {
  //  DEMO MODE: do NOT call backend
 if (DEMO_MODE && role === "user") {
  setUserRequests(demoRequests);
  return;
}

  const loadRequests = async () => {
    try {
      const res = await api.get("/users/requests");
      setUserRequests(res.data.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch requests:", err);
    }
  };

  if (role === "user") loadRequests();
}, [role]);


  /* Create Item Request */
 const handleSubmitItemRequest = async (requestData) => {

  // ✅ DEMO MODE
  if (DEMO_MODE) {
    const newReq = {
      _id: Date.now().toString(),
      ...requestData,
      status: "pending",
      requestDate: new Date(),
    };

    setUserRequests(prev => [newReq, ...prev]);

    setToast({
      show: true,
      message: "Request submitted (Demo)",
      bg: "success",
    });

    setShowCreateModal(false);
    return;
  }

  //  REAL MODE (keep your backend code here if needed)
};



  /* Cancel Request */
const cancelMyRequest = async (id) => {

  // ✅ DEMO MODE
  if (DEMO_MODE) {
    setUserRequests(prev =>
      prev.map(req =>
        req._id === id ? { ...req, status: "cancelled" } : req
      )
    );

    setToast({
      show: true,
      message: "Request cancelled (Demo)",
      bg: "danger",
    });

    return;
  }

  // 🔵 REAL MODE (optional backend code)
};


useEffect(() => {
  // 🔴 DEMO MODE: no backend calls
  if (DEMO_MODE) {
    setLowStock([]);
    return;
  }

  const loadLimitedStock = async () => {
    try {
      const res = await api.get("/manager/limitedStock");
      setLowStock(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch limited stock:", err);
    }
  };

  if (role === "admin") {
    loadLimitedStock();
  }
}, [role]);



  /* Filter Data as Per Your Rules */
  const filteredMyRequests = userRequests.filter(
    (req) => req.status === "pending" || req.status === "approved"
  );

  const filteredBorrowedItems = userRequests.filter(
    (req) => req.status === "not-returned" || req.status === "non-returnable"
  );

  /* ===============================
          ADMIN RENDER
  =============================== */

 useEffect(() => {
  if (role === "admin") {
     navigate("/admin/dashboard", { replace: true });
  }
}, [role, navigate]);




  /* ===============================
          USER RENDER
  =============================== */
  if (role === "user") {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted">User Dashboard</p>
            <h2 className="fw-bold mb-1">Welcome {currentUser?.name || "Demo User"}</h2>
          </div>

          <Button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            Request New Item
          </Button>
        </div>

        {/* Only pending + approved */}
        <MyRequests requests={filteredMyRequests} onCancel={cancelMyRequest} />

        {/* Borrowed Items */}
        <UserBorrowedItems borrowed={filteredBorrowedItems} />


        {/* Create Modal */}
        <RequestItemModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleSubmitItemRequest}
        />  
        {/* Toast Notification */}
            {/* Toast Component */}
        <NotificationToast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          message={toast.message}
          bg={toast.bg}
        />


      </div>
    );
  }

  return null;
};

export default UniversalDashboard;
