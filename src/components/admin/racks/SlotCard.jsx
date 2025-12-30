import React from "react";
import { Package, Trash2 } from "lucide-react";

const SlotCard = ({ slot, containerId, onDeleteSlot, containerName }) => {
  
  const items =
    Array.isArray(slot.items) && slot.items.length > 0
      ? slot.items
      : slot.item
      ? [slot.item]
      : [];

  const hasItems = items.length > 0;

  const totalQty = items.reduce((sum, it) => {
    return sum + Number(it.total ?? it.quantity ?? 0);
  }, 0);

  return (
    <div
      className="p-3 rounded shadow-sm h-100 position-relative"
      style={{
        backgroundColor: "hsl(215, 25%, 14%)",
        border: "1px solid hsl(215, 20%, 25%)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <Package size={18} className="text-info" />
          <div>
            <div className="fw-bold">{slot.slotName}</div>
            <div className="small text-muted">{containerName}</div>
          </div>
        </div>

        <span className={`badge ${hasItems ? "bg-success" : "bg-secondary"}`}>
          {hasItems ? "Occupied" : "Empty"}
        </span>
      </div>

      {hasItems ? (
        <>
          <div className="text-info small fw-bold">Total Qty: {totalQty}</div>
          <div className="small text-muted">
            {items.length} item types in this slot
          </div>
        </>
      ) : (
        <div className="text-muted small">Empty slot</div>
      )}

      <Trash2
        size={20}
        className="position-absolute"
        style={{ bottom: "10px", right: "10px", cursor: "pointer", opacity: 0.6 }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        
        onClick={(e) => {
          console.log(" DELETE SLOT CLICKED ");
          e.stopPropagation();
          console.log("DELETE SLOT:", slot.slotId);
          onDeleteSlot(containerId, slot.slotId);
        }}
      />
    </div>
  );
};

export default SlotCard;
