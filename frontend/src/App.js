import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPrivilegesPage from "./pages/AdminPrivilegesPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import RequestPage from "./pages/RequestPage";
import LeavesTablePage from "./pages/LeavesTablePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPrivilegesPage />} />
          <Route path="/requests" element={<AdminRequestsPage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/leaves" element={<LeavesTablePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
