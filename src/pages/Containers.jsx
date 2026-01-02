import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { DEMO_MODE } from "../config/demo";
import { demoRacks } from "../demo/demoRacks";

import SearchBar from "../components/admin/SearchBar";
import AddRackModal from "../components/admin/racks/AddRackModal";
import ContainerGrid from "../components/admin/racks/ContainerGrid";
import NotificationToast from "../components/common/NotificationToast";

const Containers = () => {
  const location = useLocation();

  const [containers, setContainers] = useState(() =>
    structuredClone(demoRacks)
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchResult, setSearchResult] = useState("");
  const [showRackModal, setShowRackModal] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const params = new URLSearchParams(location.search);
  const jumpRack = params.get("jumpRack");
  const jumpSlot = params.get("jumpSlot");

  /* =========================
     FETCH (REAL MODE ONLY)
     ========================= */
  const fetchRacks = async () => {
    if (DEMO_MODE) return;

    try {
      const res = await api.get("/racks/getAllRacks");
      setContainers(res.data.data);
    } catch (err) {
      console.error("Error fetching racks:", err);
    }
  };

  useEffect(() => {
    fetchRacks();
  }, []);

  /* =========================
     ADD ITEM
     ========================= */
  const handleAddItem = (rackId, slotId, itemObj) => {
  if (DEMO_MODE) {
    setContainers(prev =>
      prev.map(rack => {
        // ✅ FIX: support both id and _id
        const rackMatch = rack.id === rackId || rack._id === rackId;
        if (!rackMatch) return rack;

        return {
          ...rack,
          slots: rack.slots.map(slot => {
            if (slot.slotId !== slotId) return slot;

            return {
              ...slot,
              items: [
                ...slot.items,
                {
                  itemId: `item-${Date.now()}`,
                  itemName: itemObj.itemName || itemObj.name,
                  total: itemObj.total ?? itemObj.quantity,
                  remaining: itemObj.remaining ?? itemObj.quantity,
                  ...itemObj,
                  takenHistory: [],
                },
              ],
            };
          }),
        };
      })
    );

    setToast({
      show: true,
      message: "Item added (Demo)",
      bg: "success",
    });

    return;
  }

  // 🔵 REAL MODE
  api.post(`/racks/addItem/${rackId}/${slotId}`, itemObj)
     .then(fetchRacks);
};


  /* =========================
     ADD RACK
     ========================= */
 const handleCreateRack = (rackName, slotsCount) => {
  if (DEMO_MODE) {
    const newRack = {
      id: `rack_${Date.now()}`,
      rackName,
      slots: Array.from({ length: slotsCount }, (_, i) => ({
        slotId: `slot_${Date.now()}_${i}`,
        slotNumber: i + 1,
        slotName: `Slot ${i + 1}`,
        items: [],
      })),
    };

    setContainers((prev) => [...prev, newRack]);

    setToast({
      show: true,
      message: "Rack created successfully (Demo)",
      bg: "success",
    });
    return;
  }

  // real API logic stays here
};


  /* =========================
     ADD SLOT
     ========================= */
  const handleAddSlot = rackId => {
    if (DEMO_MODE) {
      setContainers(prev =>
        prev.map(r =>
          r.id === rackId
            ? {
                ...r,
                slots: [
                  ...r.slots,
                  {
                    slotId: `slot-${Date.now()}`,
                    slotNumber: r.slots.length + 1,
                    slotName: `Slot ${r.slots.length + 1}`,
                    items: [],
                  },
                ],
              }
            : r
        )
      );

      setToast({ show: true, message: "Slot added (Demo)", bg: "success" });
      return;
    }

    api
      .post(`/racks/addSlot/${rackId}`)
      .then(fetchRacks)
      .catch(() =>
        setToast({ show: true, message: "Failed to add slot", bg: "danger" })
      );
  };

  /* =========================
     DELETE SLOT
     ========================= */
  const handleDeleteSlot = (rackId, slotId) => {
    if (DEMO_MODE) {
      setContainers(prev =>
        prev.map(r =>
          r.id === rackId
            ? { ...r, slots: r.slots.filter(s => s.slotId !== slotId) }
            : r
        )
      );

      setToast({ show: true, message: "Slot deleted (Demo)", bg: "warning" });
      return;
    }

    api
      .delete(`/racks/deleteSlot/${rackId}/${slotId}`)
      .then(fetchRacks)
      .catch(() =>
        setToast({ show: true, message: "Failed to delete slot", bg: "danger" })
      );
  };

  /* =========================
     DELETE RACK
     ========================= */
  const handleDeleteRack = rackId => {
    if (DEMO_MODE) {
      setContainers(prev => prev.filter(r => r.id !== rackId));
      setToast({ show: true, message: "Rack deleted (Demo)", bg: "warning" });
      return;
    }

    api
      .delete(`/racks/deleteRack/${rackId}`)
      .then(fetchRacks)
      .catch(() =>
        setToast({ show: true, message: "Failed to delete rack", bg: "danger" })
      );
  };

  const onFilterChange = f => {
    setActiveFilter(f);
    setSearchResult(`Filter: ${f}`);
    setTimeout(() => setSearchResult(""), 1200);
  };

  return (
    <div className="container my-4">
      <div className="mb-4 d-flex justify-content-between align-items-start flex-column flex-md-row gap-3">
        <div>
          <h2 className="fw-bold mb-1">Racks Management</h2>
          <p className="text-muted">Manage all racks and items</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowRackModal(true)}>
          + Add Rack
        </button>
      </div>

      <SearchBar
        containers={containers}
        onFilterChange={onFilterChange}
        setSearchResult={setSearchResult}
      />

      {searchResult && <div className="alert alert-info mt-3">{searchResult}</div>}

      <div className="d-flex flex-column gap-4">
        {containers.map(container => (
          <ContainerGrid
            key={container.id}
            container={container}
            activeFilter={activeFilter}
            onAddSlot={handleAddSlot}
            onDeleteRack={handleDeleteRack}
            onDeleteSlot={handleDeleteSlot}
            onAddItem={handleAddItem}
            onRefresh={fetchRacks}
          />
        ))}
      </div>

      <AddRackModal
        show={showRackModal}
        onClose={() => setShowRackModal(false)}
        onCreate={handleCreateRack}
      />

      <NotificationToast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        message={toast.message}
        bg={toast.bg}
      />
    </div>
  );
};

export default Containers;
