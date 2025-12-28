import React, { useEffect, useState } from "react";

const DistrictSelect = ({ value, onChange }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    fetch(`${BACKEND_URL}/districts`)
      .then((res) => res.json())
      .then((data) => {
        // Ensure all district names are strings
          const names = data.map((d) => (typeof d === "string" ? d : d.name));
        setDistricts(names);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading districts", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ color: "#1B5E20", fontWeight: "bold" }}>District</label>

      <select
        value={value || ""} // make sure value is always string
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #1B5E20",
          marginTop: "5px",
        }}
      >
        <option value="">Select District</option>

        {loading ? (
          <option disabled>Loading...</option>
        ) : districts.length === 0 ? (
          <option disabled>No districts available</option>
        ) : (
          districts.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default DistrictSelect;
