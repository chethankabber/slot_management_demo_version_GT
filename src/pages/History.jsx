import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Calendar, User } from "lucide-react";
import api from "../api/axios";
import { DEMO_MODE } from "../config/demo";
import { demoHistory } from "../demo/demoHistory";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // ✅ CLEAN FETCH
  const fetchHistory = async () => {
    if (DEMO_MODE) {
      setHistoryData(demoHistory); // STATIC DEMO
      return;
    }

    const res = await api.get("/history/all");
    setHistoryData(res.data.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ FILTER LOGIC
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
      item.title?.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="container my-4">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">History</h2>
        <p className="text-muted">View all recent activities and actions</p>
      </div>

      {/* SEARCH + FILTER */}
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
              <option value="slot added">Slot Added</option>
              <option value="item issued">Item Issued</option>
              <option value="item returned">Item Returned</option>
              <option value="rack deleted">Rack Deleted</option>
              <option value="slot deleted">Slot Deleted</option>
              <option value="user added">New User Added</option>
              <option value="purchase">Purchase Item</option>
            </select>
          </div>
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="d-flex flex-column gap-3">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="card p-3 shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
                color: "hsl(210, 40%, 98%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <h6 className="fw-bold mb-1">{item.title}</h6>
              <p className="text-muted small mb-1">{item.description}</p>

              <div className="d-flex align-items-center text-muted small gap-2">
                <User size={14} />
                <span className="text-white">
                  {item.createdByName || item.createdByEmail || "User Name   and  role (Admin or Manager)"}
                </span>
                <span className="badge">{item.createdByRole}</span>
                <Calendar size={14} className="ms-3" />
                <span>{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">
            No records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
