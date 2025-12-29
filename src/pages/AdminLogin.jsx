import React, { useState } from "react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(`${BACKEND_URL}/admin/login`, {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      setError("Invalid login");
      return;
    }

    const data = await res.json();
    localStorage.setItem("admin_token", data.token);
    onLogin();
  };

  return (
    <div style={{ padding: 30, maxWidth: 300, margin: "auto" }}>
      <h3>Admin Login</h3>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;
