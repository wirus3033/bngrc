import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/SideBar";
import Topbar from "./component/TopBar";
import Dashboard from "./page/Dashboard";
import Donnee from "./page/donees";

const App = () => {
  return (
    <Router>
      <div>
        <Topbar />
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <div style={{ marginLeft: "200px", padding: "20px", flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/donees" element={<Donnee />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
