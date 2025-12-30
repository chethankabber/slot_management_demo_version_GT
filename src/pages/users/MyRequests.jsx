import React, { useState } from "react";
import { Button, Modal, } from "react-bootstrap";
import { Calendar, Package } from "lucide-react";
import StatusTag from "../../utils/StatusTag";

const MyRequests = ({ requests = [], onCancel }) => {
  const [selectedReq, setSelectedReq] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  const openDetail = (req) => {
    setSelectedReq(req);
    setShowDetailModal(true);
  };

  const closeDetail = () => {
    setSelectedReq(null);
    setShowDetailModal(false);
  };

  const confirmCancel = (id) => {
    setCancelId(id);
    setShowCancelModal(true);
  };
  
  const formattedReturnDate =
  selectedReq && selectedReq.returnDate
    ? new Date(selectedReq.returnDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "Non-Returnable";


  return (
    <div
      className="card p-3 mb-4"
      style={{
        background: "hsl(215,25%,12%)",
        border: "1px solid hsl(215,20%,25%)",
        color: "white",
      }}
    >
      <h5 className="fw-bold mb-3">My Requests</h5>

      {requests.length === 0 ? (
        <p className="text-muted">You have not made any requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className="p-3 mb-3 rounded"
            style={{
              background: "hsl(215,25%,16%)",
              border: "1px solid hsl(215,20%,25%)",
              cursor: "pointer",
            }}
            onClick={() => openDetail(req)}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <p className="mb-1"><Package size={16} className="me-1 text-primary" />
                     <strong>Item:</strong> {req.itemName}</p>
                <p className="mb-1"><strong>Project:</strong> {req.project}</p>
                <p className="mb-1"><strong>Qty:</strong> {req.quantity}</p>
              </div>

              <div className="text-center">
                <p className="mb-4 d-flex align-items-center justify-content-end gap-2">
                  <strong>Status:</strong>
                  <StatusTag status={req.status} />
                </p>

                {req.status === "pending" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmCancel(req._id);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={closeDetail} centered>
        <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
          {selectedReq && (
            <div>
              <p><strong>Item:</strong> {selectedReq.itemName}</p>
              <p><strong>Quantity:</strong> {selectedReq.quantity}</p>
              <p><strong>Project:</strong> {selectedReq.project}</p>
              <p>
                <strong>Return Date:</strong>{" "}
                {selectedReq?.returnDate ? formattedReturnDate : "Non-Returnable"}
              </p>
              <p><strong>Status:</strong> <StatusTag status={selectedReq.status} /></p>
              <hr className="text-muted" />

              <p><strong>Message:</strong></p>
              <div className="p-2 rounded" style={{ background: "hsl(215,25%,12%)" }}>
                {selectedReq.message || "No message"}
              </div>

              <hr className="text-muted" />
              <div className="mt-3 d-flex justify-content-end">
                {selectedReq.status === "pending" && (
                  <Button
                    variant="danger"
                    onClick={() => {
                      confirmCancel(selectedReq._id);
                      closeDetail();
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Custom Cancel Confirm Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
          Are you sure you want to cancel this request?
        </Modal.Body>
        <Modal.Footer style={{ background: "hsl(215,25%,14%)" }}>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onCancel(cancelId);
              setShowCancelModal(false);
            }}
          >
            Yes, Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyRequests;
