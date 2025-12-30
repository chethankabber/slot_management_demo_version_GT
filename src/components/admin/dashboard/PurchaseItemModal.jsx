import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import NotificationToast from "../../common/NotificationToast";

const PurchaseItemModal = ({ show, onClose, onSave, editItem }) => {
  const [form, setForm] = useState({
    name: "",
    qty: 0,
    description: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });
  // Prefill on edit
  useEffect(() => {
    if (editItem) {
      setForm(editItem);
    } else {
      setForm({ name: "", qty: 0, description: "" });
    }
  }, [editItem]);

  const handleSubmit = () => {
     if (!form.name.trim() || form.qty <= 0) {
     setToast({
        show: true,
        message: "Item name and quantity are required",
        bg: "danger",
      });
    return;
  }
     onSave(form);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        className="text-white"
        style={{ background: "hsl(215,25%,10%)" }}
      >
        <Modal.Title>
          {editItem ? "Purchase Item" : "Add Purchase Item"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ background: "hsl(215,25%,20%)", color: "white" }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Item Name*</Form.Label>
          <Form.Control
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter item name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity*</Form.Label>
          <Form.Control
            type="number"
            value={form.qty}
            onChange={(e) =>
              setForm({ ...form, qty: Number(e.target.value) })
            }
            placeholder="Enter quantity"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            size="sm"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description Optional"
          />
        </Form.Group>
        <NotificationToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                message={toast.message}
                bg={toast.bg}
              />
      </Modal.Body>

      <Modal.Footer
        style={{ background: "hsl(215,25%,15%)" }}
      >
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          {editItem ? "Update & Save" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseItemModal;
