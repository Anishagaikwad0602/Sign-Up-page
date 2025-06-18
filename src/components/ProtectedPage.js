import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const staticData = [
  { id: 1, name: "Michael Holz", date: "04/10/2013", role: "Admin", status: "Active" },
  { id: 2, name: "Paula Wilson", date: "05/08/2014", role: "Publisher", status: "Active" },
  { id: 3, name: "Antonio Moreno", date: "11/05/2015", role: "Publisher", status: "Suspended" },
  { id: 4, name: "Mary Saveley", date: "06/09/2016", role: "Reviewer", status: "Active" },
  { id: 5, name: "Martin Sommer", date: "12/08/2017", role: "Moderator", status: "Inactive" },
];

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome to Dashboard</h2>

      {user && (
        <div style={{ marginBottom: "20px" }}>
          <p><strong>Logged in as:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>DOB:</strong> {user.dob}</p>
        </div>
      )}

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staticData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.role}</td>
              <td style={{ color: item.status === "Active" ? "green" : item.status === "Suspended" ? "orange" : "red" }}>
                {item.status}
              </td>
              <td>
                <button style={{ marginRight: "5px" }}>⚙️</button>
                <button>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={logout}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default ProtectedPage;
