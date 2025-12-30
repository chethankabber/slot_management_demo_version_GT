import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api/axios";
import NotificationToast from "../common/NotificationToast";
import PurchaseItemModal from "../admin/dashboard/PurchaseItemModal";

const ManagerPermissionModal = ({ show, onClose, request, onGiven, onRefresh }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [issueQty, setIssueQty] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseDraft, setPurchaseDraft] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  /* =========================
     FETCH ITEM AVAILABILITY
     ========================= */
  useEffect(() => {
    if (!request || !show) return;

    setAvailability([]);
    setSelectedSlot(null);
    setIssueQty(0);

    api
      .get(`/manager/itemAvailability/${request.itemName}`)
      .then((res) => setAvailability(res.data.data || []))
      .catch(() => setAvailability([]));
  }, [request, show]);

  /* =========================
     AUTO SELECT BEST SLOT
     ========================= */
  useEffect(() => {
    if (availability.length > 0) {
      const bestSlot = availability.reduce((max, curr) =>
        curr.remaining > max.remaining ? curr : max
      );

      setSelectedSlot(bestSlot);
      setIssueQty(
        Math.min(bestSlot.remaining, request.quantity)
      );
    } else {
      setSelectedSlot(null);
      setIssueQty(0);
    }
  }, [availability, request?.quantity]);

  if (!request) return null;

  /* =========================
     FORMAT RETURN DATE
     ========================= */
  const formattedReturnDate =
    request.isReturnable && request.returnDate
      ? new Date(request.returnDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : null;

  /* =========================
     ISSUE ITEM
     ========================= */
  const handleGiveItem = async () => {
    if (!selectedSlot || issueQty < 1) {
      setToast({
        show: true,
        message: "Invalid issue quantity",
        bg: "danger",
      });
      return;
    }

    try {
      await api.post(`/manager/giveItem/${request._id}`, {
        rackName: selectedSlot.rackName,
        slotNumber: selectedSlot.slotNumber,
        quantity: issueQty,
      });

      setToast({
        show: true,
        message: `Issued ${issueQty} item(s) successfully`,
        bg: "success",
      });

      setTimeout(() => {
        onGiven();
        onClose();
      }, 800);
    } catch (err) {
      setToast({
        show: true,
        message: "Failed to issue item",
        bg: "danger",
      });
    }
  };

 /* =========================
     OPEN PURCHASE MODAL 
     ========================= */
  const addToPurchaseList = () => {
    const missingQty =
      selectedSlot && selectedSlot.remaining > 0
        ? request.quantity - selectedSlot.remaining
        : request.quantity;

    setPurchaseDraft({
      name: request.itemName,
      qty: missingQty,
      description: `Requested by ${request.user.name} for project ${request.project}`,
    });

    setShowPurchaseModal(true);
  };


  /* =========================
     UI
     ========================= */
  return (
    <>
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="text-white" style={{ background: "hsl(215,25%,10%)" }}>
        <Modal.Title>Give Item To User</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-white" style={{ background: "hsl(215,25%,20%)" }}>
        {/* USER INFO */}
        <p><strong>User:</strong> {request.user.name}</p>
        <p><strong>Email:</strong> {request.user.email}</p>
        <hr />

        {/* ITEM INFO */}
        <p><strong>Item:</strong> {request.itemName}</p>
        <p><strong>Qty Requested:</strong> {request.quantity}</p>
        <p><strong>Project:</strong> {request.project}</p>

        <p><strong>Returnable:</strong> {request.isReturnable ? "Yes" : "No"}</p>

        {formattedReturnDate && (
          <p><strong>Return Date:</strong> {formattedReturnDate}</p>
        )}

        <p><strong>Message:</strong> {request.message?.trim() || "-"}</p>

        <hr />

        {/* SLOT INFO */}
        <p>Rack Name: <strong>{selectedSlot?.rackName || "-"}</strong></p>
        <p>Slot Name: <strong>{selectedSlot?.slotName || "-"}</strong></p>

        {selectedSlot && (
          <>
            <p>Remaining Quantity: <strong>{selectedSlot.remaining}</strong></p>

            {/* <Form.Group className="mt-2">
              <Form.Label>Issue Quantity</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={selectedSlot.remaining}
                value={issueQty}
                onChange={(e) =>
                  setIssueQty(
                    Math.min(Number(e.target.value), selectedSlot.remaining)
                  )
                }
              />
            </Form.Group> */}
          </>
        )}

        {/* WARNINGS + PURCHASE */}
        {availability.length === 0 && (
          <div className="mt-3">
            <p className="text-warning">⚠️ Item not available in any rack</p>
            <Button size="sm" variant="outline-warning" onClick={addToPurchaseList}>
              + Add to Purchase List
            </Button>
          </div>
        )}

        {selectedSlot && selectedSlot.remaining < request.quantity && (
          <div className="mt-3">
            <p className="text-danger">
              Only {selectedSlot.remaining} available
            </p>
            <Button size="sm" variant="outline-warning" onClick={addToPurchaseList}>
              + Add to Purchase List
            </Button>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-dark" style={{ borderTop: "1px solid hsl(215,20%,25%)" }}>
        <Button
          variant="success"
          onClick={handleGiveItem}
          disabled={!selectedSlot || issueQty < 1}
        >
          Issue Item ✓
        </Button>
      </Modal.Footer>

      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </Modal>
     {/*  PURCHASE ITEM MODAL */}
      {showPurchaseModal && (
        <PurchaseItemModal
          show={showPurchaseModal}
          editItem={purchaseDraft}
          onClose={() => {
            setShowPurchaseModal(false);
            setPurchaseDraft(null);
          }}
          onSave={async (data) => {
            try {
              await api.post("/purchase-items/add", data);

              setToast({
                show: true,
                message: "Added to purchase list",
                bg: "success",
              });
              
              onRefresh && onRefresh();
              setShowPurchaseModal(false);
              setPurchaseDraft(null);
            } catch {
              setToast({
                show: true,
                message: "Failed to add purchase item",
                bg: "danger",
              });
            }
          }}
        />
      )}
    </>
  );
};

export default ManagerPermissionModal;
