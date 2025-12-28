import React, { useState } from "react";
import DistrictSelect from "../components/DistrictSelect";
import "./Register.css";

const Register = () => {
  const [district, setDistrict] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    voterId: "",
    state: "Tamil Nadu",
    photo: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoto = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
// const payload = {
//     ...formData,
//     district: district
//   };
//   const response = await fetch("http://127.0.0.1:8000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });

//   const result = await response.json();

//   if (response.ok) {
//     alert("Registration successful!");
//     console.log(result);
//   } else {
//     alert("Error: " + result.detail);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();

  formDataObj.append("name", formData.name);
  formDataObj.append("mobile", formData.mobile);
  formDataObj.append("email", formData.email);
  formDataObj.append("voterId", formData.voterId);
  formDataObj.append("district", district);
  formDataObj.append("state", formData.state);

  if (formData.photo) {
    formDataObj.append("photo", formData.photo);
  }

  const response = await fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    body: formDataObj,
  });

  const result = await response.json();

  if (response.ok) {
    alert("பதிவு வெற்றிகரமாக முடிந்தது!");
  } else {
    alert("Error occurred");
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
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="மொபைல் எண்"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="மின்னஞ்சல்"
          onChange={handleChange}
        />

        <input
          type="text"
          name="voterId"
          placeholder="வாக்காளர் அடையாள எண்"
          onChange={handleChange}
        />

        {/* 🔽 District Dropdown (MongoDB Data) */}
        <DistrictSelect onChange={setDistrict} />

        <input
          type="text"
          name="state"
          value="Tamil Nadu"
          readOnly
        />

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



// import React, { useState } from "react";
// import DistrictSelect from "../components/DistrictSelect";

// const Register = () => {
//   const [district, setDistrict] = useState("");

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ color: "#1B5E20" }}>Candidate Registration</h2>

//       {/* District Dropdown */}
//       <DistrictSelect onChange={setDistrict} />

//       {/* Temporary display */}
//       {district && (
//         <p style={{ color: "#1B5E20" }}>
//           Selected District: <b>{district}</b>
//         </p>
//       )}
//     </div>
//   );
// };

// export default Register;

// import "./Register.css";

// function Register() {
//   return (
//     <div className="register-container">
//       <h2>உறுப்பினர் பதிவு</h2>

//       <form className="register-form">
//         <input type="text" placeholder="முழு பெயர்" />
//         <input type="text" placeholder="மொபைல் எண்" />
//         <input type="email" placeholder="மின்னஞ்சல்" />
//         <input type="text" placeholder="வாக்காளர் அடையாள எண்" />
//         <input type="text" placeholder="மாவட்டம்" />
//         <input type="text" placeholder="மாநிலம்" />

//         <label className="upload-label">
//           புகைப்படம் பதிவேற்றம்
//           <input type="file" hidden />
//         </label>

//         <button type="submit">பதிவு செய்யவும்</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
