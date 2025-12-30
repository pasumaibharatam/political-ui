import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://political-backend-wvrc.onrender.com";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/admin/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
 console.log("LOGIN RESPONSE:", data);
      // ✅ SAVE TOKEN
      localStorage.setItem("admin_token", data.token);

      // ✅ REDIRECT
      navigate("/admin");

    } catch (err) {
      setError("Wrong username or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          autoComplete="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <button style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
