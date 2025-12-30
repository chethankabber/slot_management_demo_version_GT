// Slot Detail + Add Item + Edit Item + Return Item
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Package, Trash2, Pencil, PenLine } from "lucide-react";
import api from "../../../api/axios";
import NotificationToast from "../../common/NotificationToast";

import AddItemModal from "./AddItemModal";


const SlotDetailModal = ({
  show,
  onClose,
  slot,
  containerId,
  onAddItem,
  refresh,
}) => {
  // MODALS
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
  });
  //////////////////edit slot name /////////////////////////////
  const [isEditingSlotName, setIsEditingSlotName] = useState(false);
  const [slotNameInput, setSlotNameInput] = useState("");
  ////////////////////////////////////////////////////////////////

  const [showReturnModal, setShowReturnModal] = useState(false);

  // DATA
  const [editItem, setEditItem] = useState(null);
  // const [deleteItem, setDeleteItem] = useState(null);
  const [returnContext, setReturnContext] = useState(null);
  const [returnQty, setReturnQty] = useState(1);
  const [selectedBorrower, setSelectedBorrower] = useState("");

  // TOAST
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  useEffect(() => {
    if (!show) {
      setShowAddItemModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
      setShowReturnModal(false);
      setEditItem(null);
      setDeleteItem(null);
      setReturnContext(null);
      setReturnQty(1);
      setSelectedBorrower("");
    }
  }, [show]);
  useEffect(() => {
    console.log(" SLOT LOADED:", slot);
  }, [slot]);
  useEffect(() => {
    if (slot?.slotName) {
      setSlotNameInput(slot.slotName);
    }
  }, [slot]);

  if (!slot) return null;

  // ITEMS
  const items = Array.isArray(slot.items) ? slot.items : [];

  const remainingQty = (it) =>
    Number(
      it.remaining ?? it.quantity ?? it.total ?? 0
    );

  const totalQty = (it) =>
    Number(it.quantity ?? it.total ?? remainingQty(it));

  // ================= ADD ITEM =================
  const handleAddItemSubmit = (itemData) => {
    if (!slot?.slotId) return;

    //  FIRST create payload
    const payload = {
      itemName: itemData.name,
      total: Number(itemData.quantity),
      remaining: Number(itemData.quantity),

      itemCategory: itemData.itemCategory,
      componentType: itemData.componentType,
      package: itemData.package,
      partNumber: itemData.partNumber,
      manufacturer: itemData.manufacturer,
      value: itemData.value,
      tolerance: itemData.tolerance,
      voltageRating: itemData.voltageRating,
      currentRating: itemData.currentRating,
      displayType: itemData.displayType,
      displayInterface: itemData.displayInterface,
      displayColor: itemData.displayColor,
      protectionType: itemData.protectionType,
      protectionLocation: itemData.protectionLocation,
      moduleType: itemData.moduleType,
    };

    //  THEN log it
    console.log(" ADD ITEM PAYLOAD:", payload);

    //  THEN call parent handler
    onAddItem(containerId, slot.slotId, payload);

    refresh();
    setShowAddItemModal(false);
    onClose();

    setToast({
      show: true,
      message: "Item added successfully!",
      bg: "success",
    });
  };





  // ================= EDIT ITEM =================
  const openEditModal = (item) => {
    setEditItem({
      ...item,
      itemId: item.itemId,
      name: item.itemName,
      quantity: totalQty(item),
      itemCategory: item.itemCategory, // Make sure this is included
      componentType: item.componentType,
      package: item.package,
      partNumber: item.partNumber,
      manufacturer: item.manufacturer,
      value: item.value,
      tolerance: item.tolerance,
      voltageRating: item.voltageRating,
      currentRating: item.currentRating,
      displayType: item.displayType,
      displayInterface: item.displayInterface,
      displayColor: item.displayColor,
      protectionType: item.protectionType,
      protectionLocation: item.protectionLocation,
      moduleType: item.moduleType,
    });
    setShowEditModal(true);
  };

  // CORRECT - Update handleEditSave to accept itemData
  const handleEditSave = async (itemData) => {
    if (!editItem) return;

    try {
      await api.put(
        `/racks/updateItem/${containerId}/${slot.slotId}/${editItem.itemId}`,
        {
          itemName: itemData.name,           // Use itemData from modal
          total: itemData.quantity,           // Use itemData from modal

          itemCategory: itemData.itemCategory,
          componentType: itemData.componentType,
          package: itemData.package,
          partNumber: itemData.partNumber,
          manufacturer: itemData.manufacturer,
          value: itemData.value,
          tolerance: itemData.tolerance,
          voltageRating: itemData.voltageRating,
          currentRating: itemData.currentRating,
          displayType: itemData.displayType,
          displayInterface: itemData.displayInterface,
          displayColor: itemData.displayColor,
          protectionType: itemData.protectionType,
          protectionLocation: itemData.protectionLocation,
          moduleType: itemData.moduleType,
        }
      );

      setToast({
        show: true,
        message: "Item updated successfully",
        bg: "success",
      });

      setShowEditModal(false);
      setEditItem(null);
      refresh();
      onClose();
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Update failed",
        bg: "danger",
      });
    }
  };

  // ================= DELETE ITEM =================
  const openDeleteModal = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const handleDeleteItem = async () => {
    if (!deleteItem) return;

    try {
      await api.delete(
        `/racks/deleteItem/${containerId}/${slot.slotId}/${deleteItem.itemId}`
      );

      setToast({
        show: true,
        message: "Item deleted successfully",
        bg: "success",
      });

      setShowDeleteModal(false);
      setDeleteItem(null);
      refresh();
      onClose();
    } catch {
      setToast({
        show: true,
        message: "Failed to delete item",
        bg: "danger",
      });
    }
  };

  // ================= RETURN ITEM =================
  const openReturnModal = (item) => {
    if (!item.takenHistory?.length) {
      setToast({
        show: true,
        message: "No borrow history found",
        bg: "warning",
      });
      return;
    }

    setReturnContext({
      item,
      historyList: item.takenHistory,
    });
    setShowReturnModal(true);
  };

  ///edit slot name save///
  const handleSaveSlotName = async () => {
    if (!slotNameInput.trim()) {
      setToast({
        show: true,
        message: "Slot name cannot be empty",
        bg: "danger",
      });
      return;
    }

    try {
      await api.put(
        `/racks/updateSlotName/${containerId}/${slot.slotId}`,
        { slotName: slotNameInput }
      );

      setToast({
        show: true,
        message: "Slot name updated successfully",
        bg: "success",
      });

      setIsEditingSlotName(false);
      refresh();
      onClose(); // reload racks so UI updates

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to update slot name",
        bg: "danger",
      });
    }
  };

  // ------------------------
  // CONFIRM RETURN
  // ------------------------
  const confirmReturn = async () => {
    const borrower = returnContext?.historyList.find(
      (h) => h.borrowId === selectedBorrower
    );

    if (!borrower) {
      setToast({
        show: true,
        message: "Select borrower",
        bg: "warning",
      });
      return;
    }

    if (returnQty < 1 || returnQty > borrower.quantity) {
      setToast({
        show: true,
        message: "Invalid quantity",
        bg: "danger",
      });
      return;
    }

    try {
      await api.post(`/manager/returnItem/${borrower.borrowId}`, {
        rackId: slot.rackId,
        rackName: slot.rackName,
        slotNumber: slot.slotNumber,
        returnQuantity: returnQty,
      });

      setToast({
        show: true,
        message: "Item returned successfully",
        bg: "success",
      });

      refresh();
      setShowReturnModal(false);
      setReturnContext(null);
      setReturnQty(1);
      setSelectedBorrower("");
      onClose();
    } catch {
      setToast({
        show: true,
        message: "Return failed",
        bg: "danger",
      });
    }
  };

  return (
    <>
      <NotificationToast
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() => setToast((p) => ({ ...p, show: false }))}
      />

      {/* SLOT DETAILS */}
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            {!isEditingSlotName ? (
              <>
                <span>{slot.slotName || `Slot ${slot.slotNumber}`}</span>

                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setIsEditingSlotName(true)}
                >
                  <Pencil size={16} />
                </Button>
              </>
            ) : (
              <>
                <Form.Control
                  size="sm"
                  value={slotNameInput}
                  onChange={(e) => setSlotNameInput(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />

                <Button
                  size="sm"
                  variant="success"
                  onClick={handleSaveSlotName}
                >
                  Save
                </Button>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setIsEditingSlotName(false);
                    setSlotNameInput(slot.slotName);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "#0f172a", color: "white" }}>
          {items.length === 0 && (
            <p className="text-muted">This slot is empty.</p>
          )}

          {items.map((it) => (
            <div
              key={it.itemId}
              className="p-3 mb-3 rounded"
              style={{ background: "#111827", border: "1px solid #1f2933" }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{it.itemName}</strong>
                  <div className="small text-muted">
                    <strong>Total: {totalQty(it)}</strong> | <strong>Remaining: {remainingQty(it)}</strong>
                  </div>
                  <div className="small text-muted">
                     Item Category : {it.itemCategory && ` ${it.itemCategory}`}
                    {it.componentType && ` | Component Type : ${it.componentType}`}
                  </div>  
                  <div className="small text-muted">
                    {it.package && `  Package : ${it.package}`}
                    {it.partNumber && ` | Part Number : ${it.partNumber}`}
                    {it.manufacturer && ` | Manufacturer : ${it.manufacturer}`}
                    {it.value && ` | Value : ${it.value}`}
                    {/* {it.tolerance && ` | Tolerance : ${it.tolerance}`} */}
                    {/* {it.voltageRating && ` | Voltage Rating : ${it.voltageRating}`}
                    {it.currentRating && ` | Current Rating : ${it.currentRating}`} */}
                  </div>
                </div>



                {/* item edit and delete button and also return item button */}
                <div className="d-flex gap-2" style={{height:"65px", alignItems:"center" }}> 
                  <Button size="sm" onClick={() => openEditModal(it)}>          
                    <PenLine size={16}/>                                     
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => openDeleteModal(it)} 
                  >                                                               
                    <Trash2 size={16} />                                  
                  </Button>
                  {remainingQty(it) < totalQty(it) && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => openReturnModal(it)}
                    >
                      Return
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShowAddItemModal(true)}>
            + Add Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ADD and edit ITEM */}
      <AddItemModal
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleAddItemSubmit}
        slotNumber={slot.slotNumber}
        mode="add"
      />
      <AddItemModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSave}
        slotNumber={slot.slotNumber}
        mode="edit"
        initialData={editItem}
      />




      {/* DELETE CONFIRM */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete <strong>{deleteItem?.itemName}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* RETURN MODAL */}
      <Modal show={showReturnModal} onHide={() => setShowReturnModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Return Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {returnContext && (
            <>
              <Form.Select
                className="mb-3"
                value={selectedBorrower}
                onChange={(e) => setSelectedBorrower(e.target.value)}
              >
                
                <option value="">Select borrower</option>
                {returnContext.historyList.filter((h) => h.returnDate).map((h) => (
                  <option key={h.borrowId} value={h.borrowId}>
                    {h.userName} - Qty {h.quantity}
                  </option>
                ))}
              </Form.Select>
              {returnContext.historyList.filter(h => h.returnDate).length === 0 && (
                <p className="text-danger mb-2">
                  No returnable items available
                </p>
              )}
              <p className="text-muted text">Enter quantity to return:</p>
              <Form.Control
                type="number"
                min="1"
                value={returnQty}
                onChange={(e) => setReturnQty(Number(e.target.value))}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReturnModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmReturn}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlotDetailModal;
