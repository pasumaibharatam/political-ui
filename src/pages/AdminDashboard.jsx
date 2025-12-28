import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://political-backend-wvrc.onrender.com/candidates")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch candidates");
        }
        return res.json();
      })
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // const downloadID = (mobile) => {
  //   window.open(`http://127.0.0.1:8000/download-id/${mobile}`, "_blank");
  // };
   const downloadID = (mobile) => {
    window.open(`https://political-backend-wvrc.onrender.com/download-id/${mobile}`, "_blank");
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>District</th>
            <th>State</th>
            <th>ID Card</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c, index) => (
            <tr key={index}>
              <td>{c.name}</td>
              <td>{c.mobile}</td>
              <td>{c.district}</td>
              <td>{c.state}</td>
              <td>
                <button onClick={() => downloadID(c.mobile)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
