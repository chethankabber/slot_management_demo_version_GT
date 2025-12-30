// src/pages/dashboard/UniversalDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import api from "../../api/axios";
import NotificationToast from "../../components/common/NotificationToast";

/* ==== Admin Components ==== */
// import ContainerSummaryCard from "../../components/admin/dashboard/ContainerSummaryCard";
// import PermissionRequests from "../../components/admin/dashboard/PermissionRequests";
// import ItemDueCard from "../../components/admin/dashboard/DueDatesCard";
// import LowStockCard from "../../components/admin/dashboard/LowStockCard";

/* ==== Manager Components ==== */
// import ManagerPermissionModal from "../../components/manager/ManagerPermissionModal";

/* ==== User Components ==== */
import UserBorrowedItems from "../users/UserBorrowedItems";
import { Button } from "react-bootstrap";
import RequestItemModal from "../users/RequestItemModal";
import MyRequests from "../users/MyRequests";


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
  try {
    const res = await api.post("/users/requestNewItem", requestData);

    // Success Toast
    setToast({
      show: true,
      message: "Request submitted successfully!",
      bg: "success",
    });

    // Close Modal
    setShowCreateModal(false);

    // Refresh user requests
    setUserRequests((prev) => [res.data.data, ...prev]);

  } catch (err) {
    console.error("Submit Error:", err);

    let msg = "Failed to submit request";

    // Use backend error message if exists
    if (err.response?.data?.message) {
      msg = err.response.data.message;
    }

    // Show Toast Error
    setToast({
      show: true,
      message: msg,
      bg: "danger",
    });
  }
};


  /* Cancel Request */
const cancelMyRequest = async (id) => {
  try {
    const response = await api.put(`/users/cancelRequest/${id}`);
        setToast({
        show: true,
        message: "Request Cancelled!",
        bg: "danger",
      });

    const res = await api.get("/users/requests");
    setUserRequests(res.data.data);
  } catch (error) {
    console.error(" Cancel failed full error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to cancel request");
  }
};  

useEffect(() => {
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

  // if (role === "admin") {
  //   const pending = permissionRequests.filter((r) => r.status === "pending");

  //   return (
  //     <div className="container my-4">
  //       <h2 className="fw-bold mb-1">Dashboard</h2>
  //       <p className="text-muted">Overview of your container management system</p>

  //       <div className="mb-4">
  //         {pending.length > 0 ? (
  //           <PermissionRequests
  //             permissionRequests={pending}
  //             onApprove={onPermissionApprove}
  //             onReject={onPermissionReject}
  //           />
  //         ) : (
  //           <p className="text-muted">No pending requests.</p>
  //         )}
  //       </div>

  //       {/* Rack Summary */}
  //     <div className="row g-4 mb-4">
  //       {containers.map((container) => (
  //         <div key={container._id} className="col-12 col-sm-6 col-lg-4">
  //           <ContainerSummaryCard container={container} basePath="/admin/racks" />
  //         </div>
  //       ))}
  //     </div>

  //       <div className="row g-4 mt-4">
  //         <div className="col-lg-6">
  //           <ItemDueCard containers={containers} />
  //         </div>
  //         <div className="col-lg-6">
  //           <LowStockCard lowStock={lowStock} onJumpToSlot={(rackId, slotNumber) =>
  //              navigate(`/admin/racks?jumpRack=${rackId}&jumpSlot=${slotNumber}`)
  //           }/>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


 /* ===============================
        MANAGER RENDER
=============================== */
  // if (role === "manager") {
  //   return (
  //     <div className="container my-4">
  //       <h2 className="fw-bold mb-3">Manager Dashboard</h2>
  //       <p className="text-muted">Overview of racks, items and approvals</p>

  //       {/* APPROVED REQUESTS */}
  //       <div
  //         className="card p-3 mb-4"
  //         style={{
  //           background: "hsl(215,25%,12%)",
  //           border: "1px solid hsl(215,20%,25%)",
  //           color: "white",
  //         }}
  //       >
  //         <h5 className="fw-bold mb-3">Approved Requests</h5>

  //         {approvedPermissions.length === 0 ? (
  //           <p className="text-muted">No approved permissions yet.</p>
  //         ) : (
  //           approvedPermissions.map((req) => (
  //             <div
  //               key={req.id}
  //               className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
  //               style={{
  //                 background: "hsl(215,25%,16%)",
  //                 border: "1px solid hsl(215,20%,25%)",
  //                 cursor: "pointer",
  //               }}
  //               onClick={() => {
  //                 setSelectedReq(req);
  //                 setShowManagerModal(true);
  //               }}
  //             >
  //               <div>
  //                 <div className="fw-bold">
  //                   <UserCircle size={20} className="me-2" />
  //                   {req.userName}
  //                 </div>
  //                 <div className="text-muted">{req.userEmail}</div>
  //                 <div className="text-muted">Project: {req.whichProject}</div>
  //               </div>

  //               <div>
  //                 <div className="text-muted">Item: {req.itemName}</div>
  //                 <div className="text-muted">Qty: {req.quantity}</div>
  //               </div>

  //               <div className="text-end text-secondary fw-bold">View Details</div>
  //             </div>
  //           ))
  //         )}
  //       </div>

  //       {/* RACK SUMMARY */}
  //       <div className="row g-3 mb-4">
  //         {containers.map((rack) => (
  //           <div className="col-12 col-sm-6 col-lg-4" key={rack.id}>
  //             <ContainerSummaryCard container={rack} basePath="/manager/racks" />
  //           </div>
  //         ))}
  //       </div>

  //       <div className="row g-4">
  //         <div className="col-lg-6">
  //           <ItemDueCard containers={containers} />
  //         </div>

  //         <div className="col-lg-6">
  //           <LowStockCard containers={containers} onJumpToSlot={jumpToSlot} />
  //         </div>
  //       </div>

  //       <ManagerPermissionModal
  //         show={showManagerModal}
  //         onClose={() => setShowManagerModal(false)}
  //         request={selectedReq}
  //         onGiven={() => window.location.reload()}
  //       />
  //     </div>
  //   );
  // }


  /* ===============================
          USER RENDER
  =============================== */
  if (role === "user") {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted">User Dashboard</p>
            <h2 className="fw-bold mb-1">Welcome {currentUser?.name}</h2>
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
