import React, { useState } from "react";
import DistrictSelect from "../components/DistrictSelect";

const CandidateRegister = () => {
  const [district, setDistrict] = useState("");

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      background: "#E8F5E9"
    }}>
      <h2 style={{ textAlign: "center", color: "#1B5E20" }}>
        Candidate Registration
      </h2>

      <DistrictSelect onChange={setDistrict} />

      {district && (
        <p style={{ color: "#1B5E20" }}>
          Selected District: <b>{district}</b>
        </p>
      )}
    </div>
  );
};

export default CandidateRegister;
