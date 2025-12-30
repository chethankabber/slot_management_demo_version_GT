import React from "react";
import { Modal, Button,  User } from "react-bootstrap";



const PermissionRequestModal = ({ request, onClose, onApprove, onReject }) => {  // request = selectedRequest object

  const formatDate = (date) => {
    
  if (!date) return "N/A";
  
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
 };

  return (
    // modal is always visible when this component renders.
    <Modal show={true} onHide={onClose} centered>  
      <Modal.Header closeButton>
        <Modal.Title>Permission Request Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        <p> <strong>User:</strong> {request.user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {request.user?.email || "N/A"}</p>

        <hr />

        <p><strong>Item:</strong> {request.itemName}</p>
        <p><strong>Project:</strong> {request.project || "N/A"}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p><strong>Request Date:</strong> {request.requestDate ? formatDate(request.requestDate) : "N/A"}</p>
        
        <p><strong>Message:</strong></p>
        <div
            style={{
              background: "hsl(215, 25%, 14%)",
              color: "hsl(210, 40%, 98%)",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid hsl(215, 20%, 25%)",
              minHeight: "60px",
             }}
          >
           {request.message || "No additional message provided."}
       </div>

        <hr />

        <p>
         <strong>Returnable:</strong>{" "}
           {request.isReturnable ? "Yes" : "No"}
        </p>

        {request.isReturnable && (
       <p><strong>Return Date:</strong> {formatDate(request.returnDate)}</p>
       )}
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
         </Button>

         <Button
           variant="danger"
           onClick={() => {
           const id = request._id || request.id;
           console.log("Reject clicked - ID:", id);
           onReject(id);
           onClose();
           }}
         >
            Reject
         </Button>

          <Button
            variant="success"
            onClick={() => {
            const id = request._id || request.id;
            console.log("Approve clicked - ID:", id);
            onApprove(id);
            onClose();
             }}
          >
            Approve
         </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default PermissionRequestModal;
