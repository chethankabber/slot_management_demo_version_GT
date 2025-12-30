// components/admin/dashboard/ItemDueCard.jsx
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../api/axios";
import { Maximize2, X } from "lucide-react";  
import NotificationToast from "../../common/NotificationToast";


const ItemDueCard = () => {
  const [rows, setRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false); //  Popup state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });
  const [sendingId, setSendingId] = useState(null);

  const sendReminder = async (id) => {
  try {
     setSendingId(id);   //START loading
    await api.post(`/manager/sendReminder/${id}`);

    setToast({
      show: true,
      message: "Email reminder sent successfully!",
      bg: "success",
    });

  } catch (err) {
    console.error("Reminder failed", err);

    setToast({
      show: true,
      message: "Failed to send email reminder",
      bg: "danger",
    });
   } finally {
    setSendingId(null); // STOP loading
  }
  };


  const fetchDueDates = async () => {
    try {
      const res = await api.get("/manager/dueDates");
      setRows(res.data?.data || []);
    } catch {
      setRows([]);
    }
  };

  useEffect(() => {
    fetchDueDates();
  }, []);

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "-";

  const TableContent = () => (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <table className="table-bordered mb-0" style={{ width: "100%", backgroundColor: "#191f24" }}>
        <thead
          style={{
            position: "scroll",
            top: 0,
            zIndex: 3,
            background: "hsl(215, 25%, 18%)",
          }}
        >
          <tr>
            <th style={{ padding: "10px 12px" }}>Item</th>
            <th style={{ padding: "10px 12px" }}>User</th>
            <th style={{ padding: "10px 12px" }}>Taken</th>
            <th style={{ padding: "10px 12px" }}>Return</th>
            <th style={{ padding: "10px 12px" }}>Days Left</th>
            <th style={{ padding: "10px 12px" }}>Overdue</th>
            <th style={{ padding: "10px 12px" }}></th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                No due items
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr
                key={r.borrowId}
                style={{
                  background: i % 2 === 0 ? "hsl(215, 25%, 14%)" : "hsl(215, 25%, 16%)",
                }}
              >
                <td style={{ padding: "10px 12px" }}>{r.itemName}</td>
                <td style={{ padding: "10px 12px" }}>{r.userName}</td>
                <td style={{ padding: "10px 12px" }}>{formatDate(r.takenDate)}</td>
                <td style={{ padding: "10px 12px" }}>{formatDate(r.returnDate)}</td>
                <td style={{ padding: "10px 12px" }}>{r.daysLeft ?? "-"}</td>
                <td
                  style={{
                    padding: "10px 12px",
                    color: r.overdueDays > 0 ? "red" : "white",
                  }}
                >
                  {r.overdueDays ?? 0} days
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <button  style={{ padding: "6px 8px", background: "#1e90e1d3", borderRadius:"8px", borderColor:"#f4efef66" }}
                     disabled={sendingId === r.borrowId}
                     onClick={() => sendReminder(r.borrowId)}>
                    {sendingId === r.borrowId ? "Sending.." : "Reminder"}
                  </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  const CardUI = () => (
    <div
      className="card shadow-sm"
      style={{
        background: "hsl(215, 25%, 12%)",
        border: "1px solid hsl(215, 20%, 25%)",
        color: "white",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Expand Button */}
      <button
        className="btn btn-sm"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
        }}
        onClick={() => setShowPopup(true)}
      >
        <Maximize2 size={18} className="p-0 mb-1" />
      </button>

      <div
        className="card-header fw-bold"
        style={{ borderColor: "hsl(215,25%,25%)" }}
      >
        Item Due Dates
      </div>

      <div
        className="card-body"
        style={{
          maxHeight: "320px",
          overflowY: "auto",
          overflowX: "auto",
          paddingRight: "6px",
        }}
      >
        <TableContent />
      </div>
    </div>
  );

  return (
    <>
      <CardUI />

      {/* Modal with same UI */}
      <Modal
        show={showPopup}
        onHide={() => setShowPopup(false)}
        centered
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Header
            style={{
                 background: "hsl(215,25%,14%)",
                 color: "white",
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center"
                }}
        >
          <Modal.Title>Item Due Dates</Modal.Title>

           <X
             style={{ cursor: "pointer" }}
                onClick={() => setShowPopup(false)}
               size={28}
             />
          </Modal.Header>

        <Modal.Body
          style={{
            background: "hsl(215,25%,14%)",
            maxHeight: "75vh",
            overflowY: "auto",
            overflowX: "auto",
            paddingRight: "6px",
          }}
        >
          <TableContent />
          
        </Modal.Body>
      </Modal>
       <NotificationToast show={toast.show} message={toast.message} bg={toast.bg}
         onClose={() => setToast((prev) => ({ ...prev, show: false }))}/>
    </>
  );
};

export default ItemDueCard;
