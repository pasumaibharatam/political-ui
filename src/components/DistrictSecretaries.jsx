import React, { useEffect, useState } from "react";
import "./DistrictSecretaries.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DistrictSecretaries = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/district-secretaries`)
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  return (
    <div className="ds-page">
      <h2 className="ds-title">மாவட்ட செயலாளர்கள்</h2>

      <div className="ds-grid">
        {list.map((item, i) => (
          <div className="ds-card" key={i}>
            
            <div className="ds-photo">
              <img src={`${BACKEND_URL}${item.photo}`} alt={item.name} />
            </div>

            <div className="ds-info">
              <h3>{item.name}</h3>

              <p>
                <span className="icon">📍</span>
                {item.district}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictSecretaries;
