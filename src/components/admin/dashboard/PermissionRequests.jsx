import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PermissionRequestModal from "./PermissionRequestModal";
import { UserCircle, Package } from "lucide-react";

const PermissionRequests = ({
  permissionRequests,
  onApprove,
  onReject,
}) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(isoDate));
  };

  return (
    <>
      <div
        className="card shadow-sm mb-4"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <h5 className="mb-0 fw-semibold">Permission Requests</h5>
        </div>

        <div className="card-body">
          {permissionRequests.length === 0 ? (
            <p className="text-muted text-center mb-0">
              No permission requests
            </p>
          ) : (
            permissionRequests.map((req) => {
              const id = req._id || req.id; 
              // Debug (optional)
              console.log("Row request object:", req);
              console.log("Row ID used:", id);

              return (
                <div
                  key={id}
                  className="p-3 mb-3 rounded"
                  style={{
                    backgroundColor: "hsl(215, 25%, 14%)",
                    border: "1px solid hsl(215, 20%, 25%)",
                    cursor: "pointer",
                  }}
                >
                  {/* ----------- ROW WRAPPER (RESPONSIVE) ----------- */}
                  <div
                    className="d-flex flex-column flex-md-row justify-content-between align-items-start w-100"
                    onClick={() => setSelectedRequest(req)}
                  >
                    {/* LEFT SIDE — USER INFO */}
                    <div className="mb-3 mb-md-0">
                      <h6 className="fw-bold mb-1">
                        <UserCircle
                          size={22}
                          className="text-primary m-1"
                        />
                        {req.user?.name || "User"}
                      </h6>

                      <div className="text-muted small d-flex flex-wrap gap-3">
                        <span>
                          <Package size={15} /> Item: {req.itemName}
                        </span>
                        <span>Project: {req.project}</span>
                        <span>Qty: {req.quantity}</span>
                        <span>
                          Request-Date:{" "}
                          {req.requestDate
                            ? formatDate(req.requestDate)
                            : "N/A"}
                        </span>
                        
                        
                        <span>
                          Return-Date:{" "}
                          {req.isReturnable
                            ? formatDate(req.returnDate)
                            : "N/R"}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT SIDE — BUTTONS + DETAILS */}
                    <div className="d-flex flex-column align-items-end gap-2">
                      {/* BUTTON ROW (STACKS ON MOBILE) */}
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onApprove(id);
                          }}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onReject(id);
                          }}
                        >
                          Reject
                        </button>
                      </div>

                      {/* DETAILS LINK */}
                      <span
                        className="text small"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(req);
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedRequest && (
        <PermissionRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </>
  );
};

export default PermissionRequests;
