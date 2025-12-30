import React, { useState } from "react";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://political-backend-wvrc.onrender.com/";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      if (!data.token) {
        throw new Error("Token not received");
      }

      // ✅ SAVE TOKEN IN BROWSER
      localStorage.setItem("admin_token", data.token);

      // ✅ REDIRECT TO ADMIN DASHBOARD
      window.location.href = "/admin";
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F1F8E9",
  },
  card: {
    background: "#FFFFFF",
    padding: 30,
    borderRadius: 12,
    width: 320,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  heading: {
    marginBottom: 20,
    color: "#1B5E20",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#1B5E20",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 15,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
};

export default AdminLogin;
