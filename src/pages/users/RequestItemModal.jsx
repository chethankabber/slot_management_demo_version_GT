// // src/pages/users/RequestItemModal.jsx
// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import api from "../../api/axios";

// const RequestItemModal = ({ show, onClose, onSubmit }) => {
//   const [form, setForm] = useState({
//     itemName: "",
//     quantity: 1,
//     projectName: "",
//     returnable: false,
//     returnDate: "",
//     message: "",
//   });

//   const [error, setError] = useState("");

//   // 🔥 NEW: suggestions state
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!show) {
//       setForm({
//         itemName: "",
//         quantity: 1,
//         projectName: "",
//         returnable: false,
//         returnDate: "",
//         message: "",
//       });
//       setSuggestions([]);
//       setError("");
//     }
//   }, [show]);

//   // 🔥 NEW: Fetch suggestions from backend
//   const fetchSuggestions = async (value) => {
//     if (!value) {
//       setSuggestions([]);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.get(`/users/suggest-items?search=${value}`);
//       setSuggestions(res.data.data || []);
//     } catch (err) {
//       console.error("Suggestion Error:", err);
//     }
//     setLoading(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.itemName || !form.projectName || !form.quantity) {
//       setError("⚠ Please fill all mandatory fields");
//       return;
//     }
//     if (form.returnable && !form.returnDate) {
//       setError("⚠ Please select a return date for returnable item");
//       return;
//     }

//     const requestData = {
//       itemName: form.itemName,
//       quantity: Number(form.quantity),
//       project: form.projectName,
//       isReturnable: form.returnable,
//       returnDate: form.returnable ? form.returnDate : null,
//       message: form.message,
//     };

//     onSubmit(requestData);
//   };

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
//         <Modal.Title>Request New Item</Modal.Title>
//       </Modal.Header>

//       <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
//         <Form onSubmit={handleSubmit}>
          
//           {error && (
//             <div className="alert alert-danger py-1">
//               {error}
//             </div>
//           )}

//           {/* ======================== */}
//           {/* ITEM NAME WITH AUTOCOMPLETE */}
//           {/* ======================== */}
//           <Form.Group className="mb-2" style={{ position: "relative" }}>
//             <Form.Label>Item Name *</Form.Label>

//             <Form.Control
//               placeholder="Enter item name"
//               value={form.itemName}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 setForm({ ...form, itemName: value });
//                 fetchSuggestions(value);
//               }}
//               style={{ background: "hsl(215,25%,12%)", color: "white" }}
//             />

//             {/* Suggestion dropdown */}
//             {suggestions.length > 0 && (
//               <div
//                 style={{
//                   background: "hsl(215,25%,16%)",
//                   borderRadius: 5,
//                   position: "absolute",
//                   width: "100%",
//                   zIndex: 9999,
//                   border: "1px solid #333",
//                   maxHeight: "150px",
//                   overflowY: "auto",
//                 }}
//               >
//                {suggestions.map((item, idx) => (
//                 <div
//                     key={idx}
//                     onClick={() => {
//                          setForm({ ...form, itemName: item.itemName });
//                          setSuggestions([]);
//                     }}
//                     style={{
//                         padding: "6px 10px",
//                         cursor: "pointer",
//                         borderBottom: "1px solid #333",
//                     }}
//                   >
//                    {item.itemName} 
//                    <span style={{ color: "#aaa" }}>
//                      {" "}({item.remaining} available)
//                    </span>
//                 </div>
//                 ))}
//               </div>
//             )}
//           </Form.Group>

//           <Form.Group className="mb-2">
//             <Form.Label>Quantity *</Form.Label>
//             <Form.Control
//               type="number"
//               min={1}
//               placeholder="Enter quantity"
//               value={form.quantity}
//               onChange={(e) => setForm({ ...form, quantity: e.target.value })}
//               style={{ background: "hsl(215,25%,12%)", color: "white" }}
//             />
//           </Form.Group>

//           <Form.Group className="mb-2">
//             <Form.Label>Project *</Form.Label>
//             <Form.Control
//               placeholder="Enter project name"
//               value={form.projectName}
//               onChange={(e) => setForm({ ...form, projectName: e.target.value })}
//               style={{ background: "hsl(215,25%,12%)", color: "white" }}
//             />
//           </Form.Group>

//           <div className="d-flex align-items-center mb-2">
//             <Form.Check
//               type="checkbox"
//               label="Returnable?"
//               checked={form.returnable}
//               onChange={(e) => setForm({ ...form, returnable: e.target.checked })}
//             />

//             {form.returnable && (
//               <input
//                 type="date"
//                 className="form-control ms-2"
//                 value={form.returnDate}
//                 onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
//                 style={{ maxWidth: 200, background: "hsl(215,25%,12%)", color: "white" }}
//               />
//             )}
//           </div>

//           <Form.Group className="mb-3">
//             <Form.Label>Message (Optional)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               placeholder="Enter message if any"
//               value={form.message}
//               onChange={(e) => setForm({ ...form, message: e.target.value })}
//               style={{ background: "hsl(215,25%,12%)", color: "white" }}
//             />
//           </Form.Group>

//           <div className="d-flex justify-content-end">
//             <Button variant="secondary" onClick={onClose}>
//               Close
//             </Button>
//             <Button className="ms-2" variant="primary" type="submit">
//               Submit
//             </Button>
//           </div>

//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default RequestItemModal;

// src/pages/users/RequestItemModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../../api/axios";

const RequestItemModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    itemName: "",
    quantity: 1,
    projectName: "",
    returnable: false,
    returnDate: "",
    message: "",
  });

  const [error, setError] = useState("");

  // Suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ======================
     RESET ON OPEN
     ====================== */
  useEffect(() => {
    if (!show) {
      setForm({
        itemName: "",
        quantity: 1,
        projectName: "",
        returnable: false,
        returnDate: "",
        message: "",
      });
      setSuggestions([]);
      setError("");
    }
  }, [show]);

  /* ======================
     FETCH SUGGESTIONS
     ====================== */
  const fetchSuggestions = async (value) => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(
        `/users/suggest-items?search=${encodeURIComponent(value)}`
      );
      setSuggestions(res.data.data || []);
    } catch (err) {
      console.error("Suggestion Error:", err);
    }
    setLoading(false);
  };

  /* ======================
     SUBMIT REQUEST
     ====================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.itemName.trim() || !form.projectName || !form.quantity) {
      setError("⚠ Please fill all mandatory fields");
      return;
    }

    if (form.returnable && !form.returnDate) {
      setError("⚠ Please select a return date for returnable item");
      return;
    }

    const requestData = {
      itemName: form.itemName.trim(), // ✅ free text allowed
      quantity: Number(form.quantity),
      project: form.projectName,
      isReturnable: form.returnable,
      returnDate: form.returnable ? form.returnDate : null,
      message: form.message,
    };

    onSubmit(requestData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
        <Modal.Title>Request New Item</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
        <Form onSubmit={handleSubmit} autoComplete="off">

          {error && (
            <div className="alert alert-danger py-1">
              {error}
            </div>
          )}

          {/* ITEM NAME */}
          <Form.Group className="mb-2 position-relative">
            <Form.Label>Item Name *</Form.Label>

            <Form.Control
              placeholder="Enter item name"
              value={form.itemName}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, itemName: value });
                fetchSuggestions(value);
              }}
              style={{ background: "hsl(215,25%,12%)", color: "white" }}
            />

            

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div
                style={{
                  background: "hsl(215,25%,16%)",
                  borderRadius: 5,
                  position: "absolute",
                  width: "100%",
                  zIndex: 9999,
                  border: "1px solid #333",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setForm({ ...form, itemName: item.itemName });
                      setSuggestions([]);
                    }}
                    style={{
                      padding: "6px 10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    {item.itemName}
                    <span style={{ color: "#aaa" }}>
                      {" "}({item.remaining} available)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          {/* QUANTITY */}
          <Form.Group className="mb-2">
            <Form.Label>Quantity *</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              style={{ background: "hsl(215,25%,12%)", color: "white" }}
            />
          </Form.Group>

          {/* PROJECT */}
          <Form.Group className="mb-2">
            <Form.Label>Project *</Form.Label>
            <Form.Control
              value={form.projectName}
              onChange={(e) => setForm({ ...form, projectName: e.target.value })}
              style={{ background: "hsl(215,25%,12%)", color: "white" }}
            />
          </Form.Group>

          {/* RETURNABLE */}
          <div className="d-flex align-items-center mb-2">
            <Form.Check
              type="checkbox"
              label="Returnable?"
              checked={form.returnable}
              onChange={(e) =>
                setForm({ ...form, returnable: e.target.checked })
              }
            />

            {form.returnable && (
              <input
                type="date"
                className="form-control ms-2"
                value={form.returnDate}
                onChange={(e) =>
                  setForm({ ...form, returnDate: e.target.value })
                }
                style={{
                  maxWidth: 200,
                  background: "hsl(215,25%,12%)",
                  color: "white",
                }}
              />
            )}
          </div>

          {/* MESSAGE */}
          <Form.Group className="mb-3">
            <Form.Label>Message (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              style={{ background: "hsl(215,25%,12%)", color: "white" }}
            />
          </Form.Group>

          {/* ACTIONS */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button className="ms-2" variant="primary" type="submit">
              Submit
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestItemModal;

