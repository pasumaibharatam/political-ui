import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://pasumaibharatam.onrender.com";

const Admin = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetch(`${BACKEND_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || "Unauthorized");
        }
        setCandidates(data);
      })
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem("admin_token");
        navigate("/admin-login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin-login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <button onClick={handleLogout} style={{ marginBottom: "15px" }}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Gender</th>
            <th>District</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          ) : (
            candidates.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.mobile}</td>
                <td>{c.age}</td>
                <td>{c.gender}</td>
                <td>{c.district}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
