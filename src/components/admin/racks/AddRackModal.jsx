import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../../api/axios";
import NotificationToast from "../../common/NotificationToast";

const AddRackModal = ({ show, onClose, reload }) => {
  const [rackName, setRackName] = useState("");
  const [slotCount, setSlotCount] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const showToast = (message, bg = "danger") => {
    setToast({ show: true, message, bg });
  };

  const handleCreate = async () => {
    if (!rackName.trim()) {
      showToast("Please enter rack name", "danger");
      return;
    }

    try {
      await api.post("/racks/addRack", {
        rackName,
        slotsCount: slotCount,
      });

      showToast("Rack created successfully!", "success");
      
      setRackName("");
      setSlotCount(1);

      // Close after short delay so toast is visible
      setTimeout(() => {
        onClose();
         if (reload) reload();  //Today
      }, 700);
    
    } catch (err) {
      console.error(err);
      showToast("Failed to create rack!", "danger");
    }
  };

  return (
    <>
      {/* Notification Toast */}
      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />

      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Rack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rack Name</Form.Label>
              <Form.Control
                placeholder="Enter rack name"
                value={rackName}
                onChange={(e) => setRackName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Slots Count</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={slotCount}
                onChange={(e) => setSlotCount(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create Rack
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRackModal;
