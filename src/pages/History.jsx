import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Calendar, User } from "lucide-react";
import api from "../api/axios";


const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Fetch history data from backend
  const fetchHistory = async () => {
    try {
      const res = await api.get("/manager/history");
      setHistoryData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter logic
  const filteredHistory = historyData.filter((item) => {
  const searchKey = searchTerm.toLowerCase();

  const createdByName = item.createdByName?.toLowerCase() || "";
  const createdByEmail = item.createdByEmail?.toLowerCase() || "";

  const matchesSearch =
    item.title?.toLowerCase().includes(searchKey) ||
    item.description?.toLowerCase().includes(searchKey) ||
    createdByName.includes(searchKey) ||
    createdByEmail.includes(searchKey);

  const matchesType =
    filterType === "all" ||
    item.title.toLowerCase().includes(filterType.toLowerCase());

  return matchesSearch && matchesType;
});

  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">History</h2>
        <p className="text-muted">View all recent activities and actions</p>
      </div>

      {/* Search + Filter Bar */}
      <div
        className="card mb-4 p-3"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <div className="row g-3 align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <Search size={18} className="text-muted me-2" />
            <input
              type="text"
              className="form-control"
              placeholder="Search by item or person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="item added">Item Added</option>
              <option value="Slot Added">Slot Added</option>
              <option value="Item Issued">Item Issued</option>
              <option value="item returned">Item Returned</option>
              <option value="Rack Deleted">Rack Deleted</option>
              <option value="Slot Deleted">Slot Deleted</option>
              <option value="user added">New User Added</option>
              <option value="purchase">Purchase Item</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="d-flex flex-column gap-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item._id}
              className="card p-3 shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
                color: "hsl(210, 40%, 98%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">{item.title}</h6>
                  <p className="text-muted small mb-1">{item.description}</p>
                  <div className="d-flex align-items-center text-muted small gap-2">
                    <User size={14} />
                    <span className="text-white">{item.createdByName || item.createdByEmail}</span>
                    <span className="badge  ">
                         {item.createdByRole}
                    </span>
                    <Calendar size={14} className="ms-3" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default History;
