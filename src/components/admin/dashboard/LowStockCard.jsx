import React from "react";
import { Package } from "lucide-react";

const LowStockCard = ({ lowStock = [], onJumpToSlot }) => {
  return (
    <div
      className="card shadow-sm"
      style={{
        background: "hsl(215, 25%, 12%)",
        border: "1px solid hsl(215, 20%, 25%)",
        color: "white",
        height: "100%",
      }}
    >
      <div className="card-header fw-bold">Limited Stock Items</div>

      <div
        className="card-body"
        style={{
          maxHeight: "320px",
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        {lowStock.length === 0 ? (
          <p className="text-muted">No low-stock items.</p>
        ) : (
          lowStock.map((it, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
              style={{
                background: "hsl(215, 25%, 16%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div style={{ flex: 1 }}> 
                <div className="fw-semibold"> 
                 ItemName : {it.itemName}</div>

                <div className="text-muted small">
                  Remaining:{" "}
                  <strong className="text-white">{it.remaining}</strong>
                </div>
                {/* <Package size={18} className="text-primary p-2"/>  */}
                <div className="text-muted small"> 
                  • {it.rackName} • SlotName: {it.slotName} || Slot {it.slotNumber} 
                </div>
              </div>

              <button
                className="btn btn-secondary btn-sm ms-3"
                onClick={() => onJumpToSlot(it.rackId, it.slotId)}
              >
                Move >>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowStockCard;
