// src/pages/users/UserHistory.jsx
import React, { useEffect, useState } from "react";
import { DEMO_MODE } from "../../config/demo";
import { demoHistory } from "../../demo/demoData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Calendar, Package } from "lucide-react";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState("");

  const formatDate = (value) => {
  if (!value || value === "-") return "-";
  return new Date(value).toISOString().split("T")[0];
};

  // Fetch user history from backend
  useEffect(() => {
  if (DEMO_MODE) {
    const formatted = demoHistory.map((h, index) => ({
      id: index,
      item: h.itemName,
      qty: h.quantity,
      project: h.project,
      takenDate: formatDate(h.takenDate),
      returnedDate: formatDate(h.returnDate),
      status:
        h.status === "not-returned"
          ? "Not Returned"
          : h.status === "returned"
          ? "Returned"
          : "Non-Returnable",
    }));

    setHistory(formatted);
    return;
  }
}, []);


  // Filter logic
  const filtered = history.filter((h) => {
    const search =
      h.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.project.toLowerCase().includes(searchTerm.toLowerCase());

    const type =
      filterType === "all" ||
      h.status.toLowerCase() === filterType.toLowerCase();

    return search && type;
  });

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My History</h2>
        <p className="text-muted">Items you have borrowed from racks</p>
      </div>

      {/* Search + Filter */}
      <div
        className="card p-3 mb-4"
        style={{
          background:
            "linear-gradient(90deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
          color: "white",
          border: "1px solid hsl(215,20%,25%)",
        }}
      >
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-6 d-flex align-items-center">
            <Search size={18} className="text-muted me-2" />
            <input
              type="text"
              className="form-control"
              placeholder="Search item or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="returned">Returned</option>
              <option value="not returned">Not Returned</option>
              {/* <option value="non-returnable">Non-Returnable</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* History Cards */}
      <div className="d-flex flex-column gap-3">
        {filtered.length > 0 ? (
          filtered.map((h) => (
            <div
              key={h.id}
              className="card p-3"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
                border: "1px solid hsl(215,20%,25%)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between">
                {/* Left side */}
                <div>
                  <h6 className="fw-bold mb-1">
                    <Package size={16} className="me-1" /> {h.item}
                  </h6>

                  <p className="text-muted small mb-1">
                    Project: {h.project}
                  </p>

                  <div className="text-muted small d-flex align-items-center gap-2">
                    <Calendar size={14} /> Taken Date: {h.takenDate}
                    <Calendar size={14} className="ms-3" />
                    Return Date:{" "}
                    {h.returnedDate !== "-" ? h.returnedDate : "Not Returned"}
                  </div>
                </div>

                {/* Status */}
                <div className="fw-bold">
                  {h.status === "Returned" && (
                    <span style={{ color: "lightgreen" }}>{h.status}</span>
                  )}
                  {h.status === "Not Returned" && (
                    <span style={{ color: "orange" }}>{h.status}</span>
                  )}
                  {h.status === "Non-Returnable" && (
                    <span style={{ color: "skyblue" }}>{h.status}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted text-center mt-4">
            {error || "No records found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
