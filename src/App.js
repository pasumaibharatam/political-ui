import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./pages/Register";
import DownloadID from "./pages/DownloadID";
import AdminDashboard from "./pages/AdminDashboard";
import DistrictSecretaries from "./components/DistrictSecretaries";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const res = await fetch("/version.json", { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        const current = localStorage.getItem("app_version");

        if (current && current !== data.version) {
          localStorage.setItem("app_version", data.version);
          window.location.reload();
        }

        if (!current) {
          localStorage.setItem("app_version", data.version);
        }
      } catch (err) {
        console.log("Version check skipped");
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/download-id" element={<DownloadID />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/district-secretaries"
          element={<DistrictSecretaries />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
