// src/pages/users/UserBorrowedItems.jsx

import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, Package } from "lucide-react";

const UserBorrowedItems = () => {
  const [borrowed, setBorrowed] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowedItems = async () => {
      try {
        const res = await api.get("/users/borrowed");

        const formatted = res.data.data.map((item, index) => ({
          id: index,
          itemName: item.itemName,
          project: item.project,
          quantity: item.quantity,
          takenDate: item.takenDate ? item.takenDate.split("T")[0] : "-",
          returnDate:
            item.returnDate && item.returnDate !== "-"
              ? item.returnDate.split("T")[0]
              : "N-R",
          status: item.status,
          daysLeft: item.daysLeft,
          overdueDays: item.overdueDays,
        }));

        setBorrowed(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load borrowed items");
      }
    };

    fetchBorrowedItems();
  }, []);

  return (
    <div className="container my-4 border border-secondary">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Borrowed Items</h2>
        <p style={{ color: "hsl(215,15%,75%)" }}>Items you must return</p>
      </div>
      <hr />
      {/* Borrowed Items List */}
      <div className="d-flex flex-column gap-3 borrowed-scrollbar" style={{ maxHeight: "50vh", overflowY: "auto" }}>
        {borrowed.length === 0 && !error && (
          <p className="text-center" style={{ color: "gray" }}>
            No active borrowed items.
          </p>
        )}

        {error && (
          <p className="text-danger text-center">{error}</p>
        )}

        {borrowed.map((item) => (
          <div
            key={item.id}
            className="card p-3"
            style={{
              background:
                "linear-gradient(90deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
              border: "2px solid hsl(215, 20%, 30%)",
              borderRadius: "12px",
              padding: "20px",
              transition: "0.25s",
              color: "white",
              boxShadow: "0 0 10px rgba(63,124,255,0.15)",
            }}
            // onMouseEnter={(e) => {
            //   e.currentTarget.style.border =
            //     "2px solid hsl(215, 80%, 70%)";
            //   e.currentTarget.style.boxShadow =
            //     "0 0 12px rgba(63,124,255,0.45)";
            // }}
            // onMouseLeave={(e) => {
            //   e.currentTarget.style.border =
            //     "2px solid hsl(215, 20%, 30%)";
            //   e.currentTarget.style.boxShadow =
            //     "0 0 10px rgba(63,124,255,0.15)";
            // }}
          >
            <div className="d-flex justify-content-between">
              {/* LEFT */}
              <div>
                <h5 className="fw-bol mb-1">
                  <Package size={16} className="me-1 text-primary" />
                  {item.itemName}
                </h5> 
                <h6 className=" mb-1">
                  Project : {item.project}
                </h6>
                <h6 className=" mb-1">
                  Qty : {item.quantity}
                </h6>

                {/* <small
                  className="d-flex align-items-center gap-2"
                  style={{ color: "hsl(215,15%,70%)" }}
                >
                  <Calendar size={14} /> Taken Date: {item.takenDate}
                </small>

                <small
                  className="d-flex align-items-center gap-2"
                  style={{ color: "hsl(215,15%,70%)" }}
                >
                  <Calendar size={14} /> Return Date:{" "}
                  {item.returnDate !== "-" ? item.returnDate : "Non-Returnable"}
                </small> */}
              </div>

              {/* RIGHT STATUS */}
              <div className="text-end fw-bold">
                {item.overdueDays !== null && item.overdueDays > 0 ? (
                  <span style={{ color: "#ff4d4d" }}>
                    Overdue by {item.overdueDays} days
                  </span>
                ) : item.daysLeft !== null ? (
                  <span style={{ color: "#90ee90" }}>
                    {item.daysLeft} Days Left
                  </span>
                ) : (
                  <span style={{ color: "gray" }}>-</span>
                )}

                {item.status === "non-returnable" && (
                  <div className="badge bg-info mt-2">
                    Non-Returnable
                  </div>
                )} 
                   <div>
                    <small
                  className="d-flex align-items-center gap-2"
                  style={{ color: "hsl(215,15%,70%)" }}
                >
                  <Calendar size={14} /> Taken Date: {item.takenDate}
                </small>

                <small
                  className="d-flex align-items-center gap-2"
                  style={{ color: "hsl(215,15%,70%)" }}
                >
                  <Calendar size={14} /> Return Date:{" "}
                  {item.returnDate !== "-" ? item.returnDate : "N-R"}
                </small>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBorrowedItems;
