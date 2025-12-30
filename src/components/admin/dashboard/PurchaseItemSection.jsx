import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Package } from "lucide-react";
import PurchaseItemModal from "./PurchaseItemModal";
import api from "../../../api/axios";
import NotificationToast from "../../common/NotificationToast";

const PurchaseItemSection = ({ onRefresh, refreshKey }) => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  /* =========================
     LOAD ITEMS FROM BACKEND
     ========================= */
  const loadItems = async () => {
    try {
      const res = await api.get("/purchase-items/all");
      setItems(res.data.data || []);
    } catch (err) {
      console.error("Failed to load purchase items", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, [refreshKey]);

  /* =========================
     ADD / UPDATE ITEM
     ========================= */
  const handleSave = async (data) => {
    try {
      if (editItem) {
        await api.put(`/purchase-items/update/${editItem._id}`, data);
        // setToast({
        //   show: true,
        //   message: "Item updated successfully!",
        //   bg: "success",
        // });
      } else {
        await api.post("/purchase-items/add", data);
        
      }

      await loadItems();
      onRefresh && onRefresh();
      
      setShowModal(false);
      setEditItem(null);
    } catch (err) {
      setToast({
        show: true,
        message: err?.response?.data?.message || "Save failed",
        bg: "danger",
      });
    }
  };


  /* =========================
     DELETE ITEM
     ========================= */
  const confirmDelete = async () => {
    try {
      await api.delete(`/purchase-items/delete/${deleteId}`);
      await loadItems();
      setDeleteId(null);

    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div
      className="card"
      style={{
        background: "hsl(215,25%,12%)",
        border: "1px solid hsl(215,20%,25%)",
        color: "white",
        padding: "8px",
      }}
    >
      {/* HEADER */}
      <div className="card-header d-flex justify-content-between p-2 w-100">
        <h6 className="fw-bold mb-2" style={{ fontSize: "28px" }}>
          Purchase Items
        </h6>
        <button
          className="btn btn-sm btn-success"
          onClick={() => setShowModal(true)}
        >
          + Purchase Item
        </button>
      </div>

      {/* LIST */}
      <div
        className="card-body p-0"
        style={{ maxHeight: "150px", overflowY: "auto" }}
      >
        {items.length === 0 ? (
          <p className="text-muted p-3 mb-0">
            No purchase items
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}   // ✅ MongoDB ID
              className="p-3"
              style={{
                borderBottom: "1px solid hsl(215,20%,25%)",
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold" style={{ fontSize: "18px" }}>
                    <Package className="text-primary" /> {item.name}
                    <span
                      className="text-muted ms-2"
                      style={{ fontSize: "14px" }}
                    >
                      || Qty: {item.qty}
                    </span>
                  </div>
                  <div className="small text-muted">
                    {item.description || "-"}
                  </div>
                </div>

                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => {
                      setEditItem(item);
                      setShowModal(true);
                    }}
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setDeleteId(item._id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <PurchaseItemModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditItem(null);
          }}
          onSave={handleSave}
          editItem={editItem}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                background: "hsl(215,25%,18%)",
                color: "white",
              }}
            >
              <div className="modal-body text-center">
                <p>Are you sure you want to delete?</p>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
              <NotificationToast
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                message={toast.message}
                bg={toast.bg}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseItemSection;
