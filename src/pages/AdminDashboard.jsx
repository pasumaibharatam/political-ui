import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const candidatesPerPage = 10;

  // 🔐 FETCH PROTECTED DATA
  useEffect(() => {
    axios
      .get("https://political-backend-wvrc.onrender.com/admin/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        setCandidates(res.data);
      })
      .catch(() => {
        // ❌ Not logged in → redirect
        navigate("/admin/login");
      });
  }, [navigate]);

  // 🔎 Search filter
  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile.includes(search) ||
    c.district.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLast = currentPage * candidatesPerPage;
  const indexOfFirst = indexOfLast - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  // 📊 Stats
  const stats = {
    total: candidates.length,
    male: candidates.filter((c) => c.gender === "Male").length,
    female: candidates.filter((c) => c.gender === "Female").length,
  };

  // 📈 Charts
  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [stats.male, stats.female],
        backgroundColor: ["#1B5E20", "#4CAF50"],
      },
    ],
  };

  const ageGroups = { "18-25": 0, "26-35": 0, "36-45": 0, "46+": 0 };

  candidates.forEach((c) => {
    if (c.age >= 18 && c.age <= 25) ageGroups["18-25"]++;
    else if (c.age <= 35) ageGroups["26-35"]++;
    else if (c.age <= 45) ageGroups["36-45"]++;
    else ageGroups["46+"]++;
  });

  const barData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "Candidates by Age",
        data: Object.values(ageGroups),
        backgroundColor: "#1B5E20",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#candidates">Candidates</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Candidates</h3>
            <p>{stats.total}</p>
          </div>
          <div className="card">
            <h3>Male</h3>
            <p>{stats.male}</p>
          </div>
          <div className="card">
            <h3>Female</h3>
            <p>{stats.female}</p>
          </div>
        </section>

        <section className="charts">
          <div className="chart">
            <h3>Gender Distribution</h3>
            <Pie data={pieData} />
          </div>

          <div className="chart">
            <h3>Age Distribution</h3>
            <Bar data={barData} />
          </div>
        </section>

        <section id="candidates" className="table-section">
          <h2>Registered Candidates</h2>

          <input
            type="text"
            placeholder="Search by name, mobile, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Gender</th>
                <th>District</th>
              </tr>
            </thead>
            <tbody>
              {currentCandidates.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.mobile}</td>
                  <td>{c.age}</td>
                  <td>{c.gender}</td>
                  <td>{c.district}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;




// import React, { useEffect, useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// import "./AdminDashboard.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const candidatesPerPage = 10;

//   // Fetch candidates from backend
//   useEffect(() => {
//     fetch("https://political-backend-wvrc.onrender.com/admin")
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then(data => setCandidates(data))
//       .catch(err => console.error(err));
//   }, []);

//   // Filter candidates by search
//   const filteredCandidates = candidates.filter(c =>
//     c.name.toLowerCase().includes(search.toLowerCase()) ||
//     c.mobile.includes(search) ||
//     c.district.toLowerCase().includes(search.toLowerCase())
//   );

//   // Pagination
//   const indexOfLast = currentPage * candidatesPerPage;
//   const indexOfFirst = indexOfLast - candidatesPerPage;
//   const currentCandidates = filteredCandidates.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

//   const stats = {
//     total: candidates.length,
//     male: candidates.filter(c => c.gender === "Male").length,
//     female: candidates.filter(c => c.gender === "Female").length,
//   };

//   // Pie chart data for gender distribution
//   const pieData = {
//     labels: ["Male", "Female"],
//     datasets: [
//       {
//         label: "Gender Distribution",
//         data: [stats.male, stats.female],
//         backgroundColor: ["#1B5E20", "#4CAF50"],
//       }
//     ],
//   };

//   // Bar chart data for age distribution
//   const ageGroups = { "18-25": 0, "26-35": 0, "36-45": 0, "46+": 0 };
//   candidates.forEach(c => {
//     const age = c.age;
//     if (age >= 18 && age <= 25) ageGroups["18-25"]++;
//     else if (age >= 26 && age <= 35) ageGroups["26-35"]++;
//     else if (age >= 36 && age <= 45) ageGroups["36-45"]++;
//     else ageGroups["46+"]++;
//   });

//   const barData = {
//     labels: Object.keys(ageGroups),
//     datasets: [
//       {
//         label: "Candidates by Age",
//         data: Object.values(ageGroups),
//         backgroundColor: "#1B5E20",
//       }
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <h2>Admin</h2>
//         <nav>
//           <a href="#dashboard">Dashboard</a>
//           <a href="#candidates">Candidates</a>
//         </nav>
//       </aside>

//       <main className="main-content">
//         <header className="header">
//           <h1>Dashboard</h1>
//         </header>

//         <section className="cards">
//           <div className="card">
//             <h3>Total Candidates</h3>
//             <p>{stats.total}</p>
//           </div>
//           <div className="card">
//             <h3>Male</h3>
//             <p>{stats.male}</p>
//           </div>
//           <div className="card">
//             <h3>Female</h3>
//             <p>{stats.female}</p>
//           </div>
//         </section>

//         <section className="charts">
//           <div className="chart">
//             <h3>Gender Distribution</h3>
//             <Pie data={pieData} />
//           </div>

//           <div className="chart">
//             <h3>Age Distribution</h3>
//             <Bar data={barData} />
//           </div>
//         </section>

//         <section id="candidates" className="table-section">
//           <h2>Registered Candidates</h2>

//           <input
//             type="text"
//             placeholder="Search by name, mobile, district..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="search-input"
//           />

//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//                 <th>District</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCandidates.map(c => (
//                 <tr key={c._id}>
//                   <td>{c.name}</td>
//                   <td>{c.mobile}</td>
//                   <td>{c.age}</td>
//                   <td>{c.gender}</td>
//                   <td>{c.district}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="pagination">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 className={currentPage === i + 1 ? "active" : ""}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
