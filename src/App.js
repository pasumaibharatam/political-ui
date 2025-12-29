import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Register from "./pages/Registerold";
import Register from "./pages/Register"
import DownloadID from "./pages/DownloadID";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
         <Route path="/download-id" element={<DownloadID />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
