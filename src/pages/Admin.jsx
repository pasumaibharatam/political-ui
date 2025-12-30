import React, { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://political-backend-wvrc.onrender.com/";

const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [district, setDistrict] = useState("All");
  const [gender, setGender] = useState("All");
  const [ageRange, setAgeRange] = useState("All");

  // 🔐 AUTH + FETCH DATA
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    // 🚫 If no token → redirect
    if (!token) {
      window.location.href = "/admin-login";
      return;
    }

    fetch(`${BACKEND_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or server error");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("API response is not array:", data);
          throw new Error("Invalid data format");
        }

        setCandidates(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Admin API error:", err);
        setError("Failed to load candidates");
        setLoading(false);

        // ❌ Invalid token → logout
        if (err.message.includes("Unauthorized")) {
          localStorage.removeItem("admin_token");
          window.location.href = "/admin-login";
        }
      });
  }, []);

  // 🎯 APPLY FILTERS
  useEffect(() => {
    let data = [...candidates];

    if (district !== "All") {
      data = data.filter((c) => c?.district === district);
    }

    if (gender !== "All") {
      data = data.filter(
        (c) => c?.gender?.toLowerCase() === gender.toLowerCase()
      );
    }

    if (ageRange !== "All") {
      data = data.filter((c) => {
        if (!c?.age) return false;
        if (ageRange === "18-25") return c.age >= 18 && c.age <= 25;
        if (ageRange === "26-40") return c.age >= 26 && c.age <= 40;
        if (ageRange === "41+") return c.age >= 41;
        return true;
      });
    }

    setFiltered(data);
  }, [district, gender, ageRange, candidates]);

  // 📍 DISTRICTS
  const districts = [
    "All",
    ...new Set(candidates.map((c) => c?.district).filter(Boolean)),
  ];

  // 📄 DOWNLOAD ID
  const downloadId = (mobile) => {
    if (!mobile) return;
    window.open(`${BACKEND_URL}/download-id/${mobile}`, "_blank");
  };

  // ⏳ STATES
  if (loading) return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      {/* 🔎 FILTERS */}
      <div style={styles.filters}>
        <select onChange={(e) => setDistrict(e.target.value)}>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select onChange={(e) => setGender(e.target.value)}>
          <option value="All">All</option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
        </select>

        <select onChange={(e) => setAgeRange(e.target.value)}>
          <option value="All">All Ages</option>
          <option value="18-25">18–25</option>
          <option value="26-40">26–40</option>
          <option value="41+">41+</option>
        </select>
      </div>

      {/* 📊 SUMMARY */}
      <div style={styles.summary}>
        <span>Total: {filtered.length}</span>
        <span>Men: {filtered.filter((c) => c.gender === "Male").length}</span>
        <span>Women: {filtered.filter((c) => c.gender === "Female").length}</span>
      </div>

      {/* 🧾 CARDS */}
      <div style={styles.cardGrid}>
        {filtered.length === 0 ? (
          <p>No records found</p>
        ) : (
          filtered.map((c) => (
            <div key={c._id} style={styles.card}>
              <strong>{c.name || "No Name"}</strong>
              <p>📞 {c.mobile || "-"}</p>
              <p>🎂 {c.age || "-"}</p>
              <p>📍 {c.district || "-"}</p>

              <button
                style={styles.button}
                onClick={() => downloadId(c.mobile)}
              >
                Download ID
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 15 },
  heading: { color: "#1B5E20" },
  filters: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  summary: {
    display: "flex",
    gap: 15,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 15,
  },
  card: {
    background: "#E8F5E9",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: 8,
    width: "100%",
    padding: 8,
    background: "#1B5E20",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default Admin;
