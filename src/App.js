// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedPage from "./components/ProtectedPage";
<Route path="/dashboard" element={<ProtectedPage />} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
