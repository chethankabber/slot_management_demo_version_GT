import React from "react";

const StatusTag = ({ status }) => {
  const base = {
    padding: "4px 10px",
    borderRadius: 14,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
    minWidth: 72,
    textAlign: "center",
  };

  if (status === "pending")
    return <span style={{ ...base, background: "hsl(45,100%,65%)", color: "#222" }}>{status}</span>;
  if (status === "approved")
    return <span style={{ ...base, background: "hsl(140,40%,30%)", color: "white" }}>{status}</span>;
  if (status === "rejected")
    return <span style={{ ...base, background: "hsl(10,80%,40%)", color: "white" }}>{status}</span>;

  return <span style={{ ...base, background: "#888", color: "#fff" }}>{status}</span>;
};

export default StatusTag;
