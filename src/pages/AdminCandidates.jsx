import React, { useEffect, useState } from "react";

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = () => {
    fetch("https://political-backend-wvrc.onrender.com/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const deleteCandidate = (mobile) => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;

    fetch(`https://political-backend-wvrc.onrender.com/candidates/${mobile}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        alert("Candidate deleted");
        fetchCandidates(); // 🔁 refresh list
      })
      .catch(err => {
        alert("Error deleting candidate");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Candidates</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>District</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((c) => (
            <tr key={c.mobile}>
              <td>
                {c.photo && (
                  <img
                    src={`https://political-backend-wvrc.onrender.com/${c.photo}`}
                    alt="photo"
                    width="60"
                  />
                )}
              </td>
              <td>{c.name}</td>
              <td>{c.mobile}</td>
              <td>{c.district}</td>
              <td>{c.state}</td>
              <td>
                <button
                  onClick={() => deleteCandidate(c.mobile)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCandidates;
