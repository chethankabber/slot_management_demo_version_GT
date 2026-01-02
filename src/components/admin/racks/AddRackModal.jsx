import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import NotificationToast from "../../common/NotificationToast";

const AddRackModal = ({ show, onClose, onCreate }) => {
  const [rackName, setRackName] = useState("");
  const [slotCount, setSlotCount] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "danger",
  });

  const showToast = (message, bg = "danger") => {
    setToast({ show: true, message, bg });
  };

  const handleCreate = () => {
    if (!rackName.trim()) {
      showToast("Please enter rack name");
      return;
    }

    // 🔥 delegate logic to parent
    onCreate(rackName, slotCount);

    setRackName("");
    setSlotCount(1);
    onClose();
  };

  return (
    <>
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
