import React, { useEffect, useState } from "react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

const Admin = () => {
  const [candidates, setCandidates] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [district, setDistrict] = useState("All");
  const [gender, setGender] = useState("All");
  const [ageRange, setAgeRange] = useState("All");

  // Fetch candidates
  useEffect(() => {
    fetch(`${BACKEND_URL}/admin/candidates`)
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
        setFiltered(data);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let data = [...candidates];

    if (district !== "All") {
      data = data.filter((c) => c.district === district);
    }

    if (gender !== "All") {
      data = data.filter(
        (c) => c.gender?.toLowerCase() === gender.toLowerCase()
      );
    }

    if (ageRange !== "All") {
      if (ageRange === "18-25") data = data.filter((c) => c.age >= 18 && c.age <= 25);
      if (ageRange === "26-40") data = data.filter((c) => c.age >= 26 && c.age <= 40);
      if (ageRange === "41+") data = data.filter((c) => c.age >= 41);
    }

    setFiltered(data);
  }, [district, gender, ageRange, candidates]);

  const districts = ["All", ...new Set(candidates.map((c) => c.district))];

  const downloadId = (mobile) => {
    window.open(`${BACKEND_URL}/download-id/${mobile}`, "_blank");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <select onChange={(e) => setDistrict(e.target.value)}>
          {districts.map((d) => (
            <option key={d}>{d}</option>
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

      {/* Summary */}
      <div style={styles.summary}>
        <span>Total: {filtered.length}</span>
        <span>Men: {filtered.filter((c) => c.gender === "Male").length}</span>
        <span>Women: {filtered.filter((c) => c.gender === "Female").length}</span>
      </div>

      {/* Cards */}
      <div style={styles.cardGrid}>
        {filtered.length === 0 ? (
          <p>No records found</p>
        ) : (
          filtered.map((c) => (
            <div key={c._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <strong>{c.name}</strong>
                <span style={styles.genderTag}>{c.gender}</span>
              </div>

              <div style={styles.cardBody}>
                <p><b>Mobile:</b> {c.mobile}</p>
                <p><b>Age:</b> {c.age}</p>
                <p><b>District:</b> {c.district}</p>
              </div>

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

/* ===================== STYLES ===================== */

const styles = {
  container: {
    padding: "15px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#1B5E20",
    marginBottom: "10px",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "12px",
  },
  summary: {
    display: "flex",
    gap: "15px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#1B5E20",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "#E8F5E9",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#1B5E20",
  },
  genderTag: {
    background: "#1B5E20",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "12px",
  },
  cardBody: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  button: {
    padding: "8px",
    backgroundColor: "#1B5E20",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Admin;
