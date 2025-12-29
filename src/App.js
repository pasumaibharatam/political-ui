import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Register from "./pages/Registerold";
import Register from "./pages/Register"
import DownloadID from "./pages/DownloadID";
import AdminCandidates from "./pages/AdminCandidates";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
         <Route path="/download-id" element={<DownloadID />} />
         <Route path="/admin/candidates" element={<AdminCandidates />} />
         <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
