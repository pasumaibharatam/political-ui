import React, { useState } from "react";
import DistrictSelect from "../components/DistrictSelect";
import "./Register.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    father_name: "",
    gender: "",
    dob: "",
    age: "",
    blood_group: "",
    mobile: "",
    email: "",
    state: "Tamil Nadu",
    district: "",
    local_body: "",
    nagaram_type: "",
    constituency: "",
    ward: "",
    address: "",
    voter_id: "",
    aadhaar: "",
    photo: null,
  });

  /* -------------------- CHANGE HANDLER -------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // mobile validation
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDistrictChange = (district) => {
    setFormData((prev) => ({ ...prev, district }));
  };

  const handlePhotoChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null) {
      data.append(key, value === "" ? "" : value);
    }
  });

  for (let pair of data.entries()) {
    console.log(pair[0], pair[1]);
  }

  const res = await fetch(`${BACKEND_URL}/register`, {
    method: "POST",
    body: data,
  });

  const result = await res.json();

  if (res.ok) {
    alert("பதிவு வெற்றிகரமாக முடிந்தது!");
  } else {
    alert(result.detail || "பதிவு தோல்வி");
  }
};

  /* -------------------- UI -------------------- */
  return (
    <div className="register-container">
      <h2>உறுப்பினர் பதிவு படிவம்</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="form-row">
          <label>முழு பெயர்</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        {/* FATHER NAME */}
        <div className="form-row">
          <label>தந்தை / கணவர் பெயர்</label>
          <input name="father_name" value={formData.father_name} onChange={handleChange} />
        </div>
        {/* GENDER + DOB */}
        <div className="form-row two-col">
          <div>
            <label>பாலினம்</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">தேர்வு</option>
              <option value="Male">ஆண்</option>
              <option value="Female">பெண்</option>
              <option value="Other">மற்றவை</option>
            </select>
          </div>
          <div>
            <label>பிறந்த தேதி</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </div>
        </div>
        {/* AGE + BLOOD */}
        <div className="form-row two-col">
          <div>
            <label>வயது</label>
            <input type="number" name="age" min="18" value={formData.age} onChange={handleChange} required />
          </div>
          <div>
            <label>இரத்த வகை</label>
            <select name="blood_group" value={formData.blood_group} onChange={handleChange} required>
               <option value="">தேர்வு</option>
               <option>A+</option><option>A-</option>
               <option>B+</option><option>B-</option>
               <option>AB+</option><option>AB-</option>
               <option>O+</option><option>O-</option>
             </select>
           </div>
         </div>

         {/* MOBILE + EMAIL */}
         <div className="form-row two-col">
           <div>
             <label>மொபைல் எண்</label>
             <input name="mobile" value={formData.mobile} onChange={handleChange} required />
           </div>

           <div>
             <label>மின்னஞ்சல்</label>
             <input type="email" name="email" value={formData.email} onChange={handleChange} />
           </div>
         </div>

         {/* STATE */}
         <div className="form-row">
           <label>மாநிலம்</label>
           <input value="Tamil Nadu" readOnly />
         </div>

         {/* DISTRICT */}
         <div className="form-row">
           <label>மாவட்டம்</label>
           <DistrictSelect value={formData.district} onChange={handleDistrictChange} />
         </div>

         {/* LOCAL BODY */}
         <div className="form-row">
           <label>உள்ளாட்சி வகை</label>
           <select name="local_body" value={formData.local_body} onChange={handleChange} required>
             <option value="">தேர்வு</option>
             <option value="Ooratchi">ஊராட்சி</option>
             <option value="Peruratchi">பேரூராட்சி</option>
            <option value="Managaratchi">மாநகராட்சி</option>
           </select>
         </div>

         {/* NAGARAM TYPE */}
         <div className="form-row">
           <label>நகரம் / ஒன்றியம் / பகுதி</label>
           <select name="nagaram_type" value={formData.nagaram_type} onChange={handleChange} required>
             <option value="">தேர்வு</option>
             <option value="Nagaram">நகரம்</option>
             <option value="Ondriyam">ஒன்றியம்</option>
             <option value="Paguthi">பகுதி</option>
           </select>
         </div>

         {/* CONSTITUENCY + WARD */}
         <div className="form-row two-col">
           <input placeholder="தொகுதி" name="constituency" value={formData.constituency} onChange={handleChange} />
           <input placeholder="வார்டு" name="ward" value={formData.ward} onChange={handleChange} />
         </div>

         {/* ADDRESS */}
         <div className="form-row">
           <textarea name="address" rows="3" placeholder="முகவரி" value={formData.address} onChange={handleChange} />
         </div>

         {/* VOTER + AADHAAR */}
         <div className="form-row two-col">
           <input placeholder="வாக்காளர் எண்" name="voter_id" value={formData.voter_id} onChange={handleChange} />
           <input placeholder="ஆதார் எண்" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
        </div>

         {/* PHOTO */}
         <div className="form-row">
           <input type="file" accept="image/*" onChange={handlePhotoChange} />
         </div>

         <button type="submit">பதிவு செய்யவும்</button>
       </form>
   </div>
  );
};

export default Register;





// import React, { useState } from "react";
// import DistrictSelect from "../components/DistrictSelect";
// import "./Register.css";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     father_name: "",
//     gender: "",
//     dob: "",
//     age: "",
//     blood_group: "",
//     mobile: "",
//     email: "",
//     state: "Tamil Nadu",
//     district: "",
//     local_body: "",
//     nagaram_type: "",
//     constituency: "",
//     ward: "",
//     address: "",
//     voter_id: "",
//     aadhaar: "",
//     photo: null,
//   });

//   /* -------------------- HANDLERS -------------------- */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Mobile: numbers only, max 10
//     if (name === "mobile") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 10) return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePhotoChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       photo: e.target.files[0],
//     }));
//   };

//   const handleDistrictChange = (district) => {
//     setFormData((prev) => ({
//       ...prev,
//       district,
//     }));
//   };

//   /* -------------------- SUBMIT -------------------- */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.mobile.length !== 10) {
//       alert("சரியான 10 இலக்க மொபைல் எண் உள்ளிடவும்");
//       return;
//     }

//     const data = new FormData();
// Object.keys(formData).forEach((key) => {
//   if (formData[key] !== null) {
//     data.append(key, formData[key] || "");
//   }
// });
//     // IMPORTANT: append ALL fields (even empty)
//     data.append("name", formData.name);
//     data.append("father_name", formData.father_name || "");
//     data.append("gender", formData.gender || "");
//     data.append("dob", formData.dob || "");
//     data.append("age", formData.age);
//     data.append("blood_group", formData.blood_group);
//     data.append("mobile", formData.mobile);
//     data.append("email", formData.email || "");
//     data.append("state", formData.state);
//     data.append("district", formData.district);
//     data.append("local_body", formData.local_body || "");
//     data.append("nagaram_type", formData.nagaram_type || "");
//     data.append("constituency", formData.constituency || "");
//     data.append("ward", formData.ward || "");
//     data.append("address", formData.address || "");
//     data.append("voter_id", formData.voter_id || "");
//     data.append("aadhaar", formData.aadhaar || "");

//     if (formData.photo) {
//       data.append("photo", formData.photo);
//     }

//     // DEBUG (remove later)
//     for (let pair of data.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       const res = await fetch(`${BACKEND_URL}/register`, {
//         method: "POST",
//         body: data,
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert("பதிவு வெற்றிகரமாக முடிந்தது!");
//         // optional reset
//         // window.location.reload();
//       } else {
//         alert(result.detail || "பதிவு தோல்வி");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//   };

//   /* -------------------- UI -------------------- */

//   return (
//     <div className="register-container">
//       <h2>உறுப்பினர் பதிவு படிவம்</h2>

//       <form className="register-form" onSubmit={handleSubmit}>
//         {/* NAME */}
//         <div className="form-row">
//           <label>முழு பெயர்</label>
//           <input name="name" value={formData.name} onChange={handleChange} required />
//         </div>

//         {/* FATHER NAME */}
//         <div className="form-row">
//           <label>தந்தை / கணவர் பெயர்</label>
//           <input name="father_name" value={formData.father_name} onChange={handleChange} />
//         </div>

//         {/* GENDER + DOB */}
//         <div className="form-row two-col">
//           <div>
//             <label>பாலினம்</label>
//             <select name="gender" value={formData.gender} onChange={handleChange}>
//               <option value="">தேர்வு</option>
//               <option value="Male">ஆண்</option>
//               <option value="Female">பெண்</option>
//               <option value="Other">மற்றவை</option>
//             </select>
//           </div>

//           <div>
//             <label>பிறந்த தேதி</label>
//             <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//           </div>
//         </div>

//         {/* AGE + BLOOD */}
//         <div className="form-row two-col">
//           <div>
//             <label>வயது</label>
//             <input type="number" name="age" min="18" value={formData.age} onChange={handleChange} required />
//           </div>

//           <div>
//             <label>இரத்த வகை</label>
//             <select name="blood_group" value={formData.blood_group} onChange={handleChange} required>
//               <option value="">தேர்வு</option>
//               <option>A+</option><option>A-</option>
//               <option>B+</option><option>B-</option>
//               <option>AB+</option><option>AB-</option>
//               <option>O+</option><option>O-</option>
//             </select>
//           </div>
//         </div>

//         {/* MOBILE + EMAIL */}
//         <div className="form-row two-col">
//           <div>
//             <label>மொபைல் எண்</label>
//             <input name="mobile" value={formData.mobile} onChange={handleChange} required />
//           </div>

//           <div>
//             <label>மின்னஞ்சல்</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} />
//           </div>
//         </div>

//         {/* STATE */}
//         <div className="form-row">
//           <label>மாநிலம்</label>
//           <input value="Tamil Nadu" readOnly />
//         </div>

//         {/* DISTRICT */}
//         <div className="form-row">
//           <label>மாவட்டம்</label>
//           <DistrictSelect value={formData.district} onChange={handleDistrictChange} />
//         </div>

//         {/* LOCAL BODY */}
//         <div className="form-row">
//           <label>உள்ளாட்சி வகை</label>
//           <select name="local_body" value={formData.local_body} onChange={handleChange} required>
//             <option value="">தேர்வு</option>
//             <option value="Ooratchi">ஊராட்சி</option>
//             <option value="Peruratchi">பேரூராட்சி</option>
//             <option value="Managaratchi">மாநகராட்சி</option>
//           </select>
//         </div>

//         {/* NAGARAM TYPE */}
//         <div className="form-row">
//           <label>நகரம் / ஒன்றியம் / பகுதி</label>
//           <select name="nagaram_type" value={formData.nagaram_type} onChange={handleChange} required>
//             <option value="">தேர்வு</option>
//             <option value="Nagaram">நகரம்</option>
//             <option value="Ondriyam">ஒன்றியம்</option>
//             <option value="Paguthi">பகுதி</option>
//           </select>
//         </div>

//         {/* CONSTITUENCY + WARD */}
//         <div className="form-row two-col">
//           <input placeholder="தொகுதி" name="constituency" value={formData.constituency} onChange={handleChange} />
//           <input placeholder="வார்டு" name="ward" value={formData.ward} onChange={handleChange} />
//         </div>

//         {/* ADDRESS */}
//         <div className="form-row">
//           <textarea name="address" rows="3" placeholder="முகவரி" value={formData.address} onChange={handleChange} />
//         </div>

//         {/* VOTER + AADHAAR */}
//         <div className="form-row two-col">
//           <input placeholder="வாக்காளர் எண்" name="voter_id" value={formData.voter_id} onChange={handleChange} />
//           <input placeholder="ஆதார் எண்" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
//         </div>

//         {/* PHOTO */}
//         <div className="form-row">
//           <input type="file" accept="image/*" onChange={handlePhotoChange} />
//         </div>

//         <button type="submit">பதிவு செய்யவும்</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
