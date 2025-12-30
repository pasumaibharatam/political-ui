import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://political-backend-wvrc.onrender.com";

const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${BACKEND_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("admin_token");
          navigate("/admin/login");
          return;
        }

        const data = await res.json();
        setCandidates(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load admin data");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <button
        onClick={() => {
          localStorage.removeItem("admin_token");
          navigate("/admin/login");
        }}
      >
        Logout
      </button>

      <hr />

      {candidates.length === 0 ? (
        <p>No records</p>
      ) : (
        candidates.map((c) => (
          <div key={c._id} style={{ marginBottom: 10 }}>
            <strong>{c.name}</strong> – {c.mobile} – {c.district}
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
