import React, { useState } from "react";
import DistrictSelect from "../components/DistrictSelect";
import "./Register.css";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    voterId: "",
    state: "Tamil Nadu",
    district: "", // must be string
    photo: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, photo: file });
  };

  const handleDistrictChange = (value) => {
    // value is always a string from DistrictSelect
    setFormData({ ...formData, district: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    // try {
    //   const res = await fetch("http://127.0.0.1:8000/register", {
    //     method: "POST",
    //     body: data,
    //   });
       try {
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok) {
        alert("பதிவு வெற்றிகரமாக முடிந்தது!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          voterId: "",
          state: "Tamil Nadu",
          district: "",
          photo: null,
        });
      } else {
        alert(result.detail || "Error occurred while registering");
      }
    } catch (err) {
      console.error(err);
      alert("Server error occurred");
    }
  };

  return (
    <div className="register-container">
      <h2>உறுப்பினர் பதிவு</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="முழு பெயர்"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="மொபைல் எண்"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="மின்னஞ்சல்"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="voterId"
          placeholder="வாக்காளர் அடையாள எண்"
          value={formData.voterId}
          onChange={handleChange}
        />

        {/* ✅ District Dropdown */}
        <DistrictSelect
          value={formData.district}
          onChange={handleDistrictChange}
        />

        <input type="text" name="state" value={formData.state} readOnly />

        <label className="upload-label">
          புகைப்படம் பதிவேற்றம்
          <input type="file" hidden onChange={handlePhoto} />
        </label>

        <button type="submit">பதிவு செய்யவும்</button>
      </form>
    </div>
  );
};

export default Register;
