

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../api/axios";
import { Package, Trash2 } from "lucide-react";
import { DEMO_MODE } from "../../../config/demo";

import SlotCard from "./SlotCard";
import SlotDetailModal from "./SlotDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ContainerGrid = ({
  container,
  activeFilter = "All",
  onAddSlot,
  onDeleteRack,
  onDeleteSlot,
  onAddItem,
  onRefresh
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showDeleteRackModal, setShowDeleteRackModal] = useState(false);
  const [showDeleteSlotModal, setShowDeleteSlotModal] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);
  console.log("One slot sample:", container.slots[0])
  console.log("Container object:", container);
  // FILTER LOGIC (keep UI same, but support item or items)
  const matchesFilter = (slot) => {
    const items =
      Array.isArray(slot.items) && slot.items.length > 0
        ? slot.items
        : slot.item
          ? [slot.item]
          : [];
    const first = items[0];

    switch (activeFilter) {
      case "Returnable":
        return first && first.isReturnable;
      case "Non-returnable":
        return first && !first.isReturnable;
      case "Occupied":
        return items.length > 0;
      case "Empty":
        return items.length === 0;
      default:
        return true;
    }
  };


  const handleSlotClick = async (slotId) => {
    const slotObj = container.slots.find((s) => s.slotId === slotId);
    if (!slotObj) return;

     if (DEMO_MODE) {
    setSelectedSlot({
      ...slotObj,
      items: Array.isArray(slotObj.items) ? slotObj.items : [],
      rackId: container.id,
      rackName: container.rackName || container.name,
    });
    setShowSlotModal(true);
    return;
  }


    try {
      const res = await api.get(
        `/racks/getSlotDetails/${container.id}/${slotId}`
      );

      const slotData = res.data.data;

      setSelectedSlot({
        ...slotData,
        items: Array.isArray(slotData.items) ? slotData.items : [],
        rackId: container.id,
        rackName: container.rackName || container.name,
      });
    } catch (err) {
      console.error("Failed to load slot details:", err);

      setSelectedSlot({
        ...slotObj,
        items: Array.isArray(slotObj.items) ? slotObj.items : [],
        rackId: container.id,
        rackName: container.rackName || container.name,
      });
    }

    setShowSlotModal(true);
  };


  //   const confirmDeleteSlot = () => {
  //   if (slotToDelete) {
  //     onDeleteSlot(container.id, slotToDelete.slotId);
  //   }
  //   setShowDeleteSlotModal(false);
  //   setSlotToDelete(null);
  // };
  const confirmDeleteSlot = () => {
    if (!slotToDelete || !slotToDelete.slotId) {
      console.warn("confirmDeleteSlot: invalid slotToDelete", slotToDelete);
      setShowDeleteSlotModal(false);
      setSlotToDelete(null);
      return;
    }

    onDeleteSlot(container.id, slotToDelete.slotId);
    setShowDeleteSlotModal(false);
    setSlotToDelete(null);
  };


  const confirmDeleteRack = () => {
    onDeleteRack(container.id);
    setShowDeleteRackModal(false);
  };
  console.log("PARENT SENDING SLOT:", selectedSlot);

  return (
    <>
      {/* RACK CARD */}
      <div
        className="card shadow-sm my-3"
        style={{
          background:
            "linear-gradient(90deg, hsla(219, 9%, 55%, 1.00) 0%, hsl(215, 25%, 10%) 100%)",
          color: "white",
          borderRadius: "10px",

        }}
      >
        <div className="card-header d-flex justify-content-between">
          <h5>{container.rackName || container.name}</h5>

          <div className="d-flex gap-2">
            {/* ADD SLOT */}
            <button
              className="btn btn-sm btn-primary "
              onClick={() => onAddSlot(container.id)}
            >
              + Slot
            </button>

            {/* DELETE RACK */}
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowDeleteRackModal(true)}
            >
              <Trash2 size={16} /> Rack
            </button>
          </div>
        </div>

        {/* SLOTS */}
        <div className="card-body">
          <div className="row g-3">
            {container.slots.map((slot) => (

              <div

                key={slot.slotId}
                //key={slot._id}
                id={`rack-${container.id}-slot-${slot.slotId}`}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                onClick={() => handleSlotClick(slot.slotId)}
                style={{
                  scrollMarginTop: "140px",
                  cursor: "pointer",
                  opacity: matchesFilter(slot) ? 1 : 0.35,
                }}
              >
                <SlotCard
                  slot={slot}
                  containerName={container.rackName || container.name}
                  containerId={container.id}
                  // you can use this later if you want Add Item button inside card
                  onAddItemButton={(id, slotNum) => {
                    const slotObj = container.slots.find(
                      (s) => s.slotId === slotNum
                    );
                    setSelectedSlot(slotObj);
                    setShowSlotModal(true);
                  }}
                  onDeleteSlot={(id, slotId) => {
                    const slotObj = container.slots.find((s) => s.slotId === slotId);
                    if (!slotObj) {
                      console.warn("Card delete: slot not found for slotId", slotId);
                      return;
                    }
                    setSlotToDelete({
                      slotId: slotObj.slotId,
                      slotNumber: slotObj.slotNumber,
                    });
                    setShowDeleteSlotModal(true);
                  }}

                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DEBUG – REMOVE AFTER FIX */}
      {console.log(" FINAL SLOT SENT TO MODAL:", selectedSlot)}
      {/* SLOT DETAIL MODAL */}
      <SlotDetailModal
        show={showSlotModal}
        onClose={() => setShowSlotModal(false)}
        slot={selectedSlot}
        containerId={container.id}
        onAddItem={onAddItem}
        refresh={onRefresh}
        onDeleteSlot={() => {
          if (!selectedSlot?.slotId) return;

          const slotObj = container.slots.find(
            (s) => s.slotId === selectedSlot.slotId
          );
          if (!slotObj) {
            console.warn("Modal delete: slot not found for slotId", selectedSlot.slotId);
            return;
          }
          setSlotToDelete({
            slotId: slotObj.slotId,
            slotNumber: slotObj.slotNumber,
          });
          setShowSlotModal(false);
          setShowDeleteSlotModal(true);
        }}

      />


      {/* CONFIRM DELETE RACK */}
      <DeleteConfirmModal
        show={showDeleteRackModal}
        title="Delete Rack?"
        message={`Are you sure you want to delete rack "${container.rackName || container.name
          }"?`}
        onConfirm={confirmDeleteRack}
        onCancel={() => setShowDeleteRackModal(false)}
      />

      {/* CONFIRM DELETE SLOT */}
      <DeleteConfirmModal
        show={showDeleteSlotModal}
        title="Delete Slot ?"
        message={`Delete Slot ${slotToDelete?.slotNumber} ? All items inside will be removed.`}
        onConfirm={confirmDeleteSlot}
        onCancel={() => setShowDeleteSlotModal(false)}
      />
    </>
  );
};

export default ContainerGrid;
