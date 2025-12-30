// src/pages/Containers.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

import SearchBar from "../components/admin/SearchBar";
import AddRackModal from "../components/admin/racks/AddRackModal";
import ContainerGrid from "../components/admin/racks/ContainerGrid";
import NotificationToast from "../components/common/NotificationToast";

const Containers = () => {
  const location = useLocation();
  const [containers, setContainers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchResult, setSearchResult] = useState("");
  const [showRackModal, setShowRackModal] = useState(false);

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const params = new URLSearchParams(location.search);
  const jumpRack = params.get("jumpRack");
  const jumpSlot = params.get("jumpSlot");

  const fetchRacks = async () => {
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

  // ADD ITEM
  const handleAddItem = async (rackId, slotId, itemObj) => {
  try {
    console.log("🟢 ADD ITEM API:", rackId, slotId, itemObj);

    await api.post(
      `/racks/addItem/${rackId}/${slotId}`,
      itemObj // 🔥 SEND FULL PAYLOAD AS-IS
    );

    fetchRacks();

    setToast({
      show: true,
      message: "Item added successfully!",
      bg: "success",
    });
  } catch (err) {
    console.error("Add Item Error:", err.response?.data || err);
    setToast({
      show: true,
      message: err.response?.data?.message || "Failed to add item!",
      bg: "danger",
    });
  }
};


  useEffect(() => {
    if (!jumpRack || !jumpSlot) return;

    const t = setTimeout(() => {
      const el = document.getElementById(`rack-${jumpRack}-slot-${jumpSlot}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.boxShadow = "0 0 12px 6px skyblue";
        setTimeout(() => (el.style.boxShadow = "none"), 1500);
      }
    }, 500);

    return () => clearTimeout(t);
  }, [jumpRack, jumpSlot]);

  // ADD RACK
  const handleCreateRack = async (rackName, slotsCount) => {
    try {
      await api.post("/racks/addRack", { rackName, slotsCount });
      fetchRacks();

      setToast({
        show: true,
        message: "Rack created successfully!",
        bg: "success",
      });

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to create rack!",
        bg: "danger",
      });
    }
  };

  // ADD SLOT
  const handleAddSlot = async (rackId) => {
    try {
      await api.post(`/racks/addSlot/${rackId}`);
      fetchRacks();
      
      setToast({
        show: true,
        message: "Slot added successfully!",
        bg: "success",
      });

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to add slot!",
        bg: "danger",
      });
    }
  };

  // DELETE SLOT
  const handleDeleteSlot = async (rackId, slotId) => {
    try {
      await api.delete(`/racks/deleteSlot/${rackId}/${slotId}`);
      fetchRacks();
      // onRefresh(); //Today
      setToast({
        show: true,
        message: "Slot deleted!",
        bg: "warning",
      });

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to delete slot",
        bg: "danger",
      });
    }
  };

  // DELETE RACK
  const handleDeleteRack = async (rackId) => {
    try {
      await api.delete(`/racks/deleteRack/${rackId}`);
      fetchRacks();
      // fetchRacks();

      setToast({
        show: true,
        message: "Rack deleted",
        bg: "warning",
      });

    } catch (err) {
      setToast({
        show: true,
        message: "Failed to delete rack",
        bg: "danger",
      });
    }
  };

  const onFilterChange = (f) => {
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
        {containers.map((container) => (
          
          <ContainerGrid
            key={container._id}   // .id or ._id
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
        onCreate={(rackName, slotsCount) =>
          handleCreateRack(rackName, slotsCount)
        }
        reload={fetchRacks} 
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
