import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ManagerUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/manager/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">All Users</h2>

      <div
        className="card"
        style={{
          background: "hsl(215,25%,12%)",
          border: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        <table
          className="table-bordered mb-0"
          style={{ width: "100%", backgroundColor: "#202830ff" }}
        >
          <thead
            style={{
              background: "hsl(215,25%,18%)",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <tr>
              <th style={{ padding: "14px" }}>Name</th>
              <th style={{ padding: "14px" }}>Role</th>
              <th style={{ padding: "14px" }}>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ padding: "17px" }}>{u.name}</td>
                <td style={{ padding: "17px", textTransform: "capitalize" }}>
                  {u.role}
                </td>
                <td style={{ padding: "17px" }}>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerUsers;
