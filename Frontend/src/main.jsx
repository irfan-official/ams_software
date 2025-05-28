import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Report from "./Report.jsx";
import Create from "./Create.jsx";
import LoginTeacher from "./LoginTeacher.jsx";
import RegisterTeacher from "./RegisterTeacher.jsx"
import Home from "./Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<App />} />
        <Route path="/report" element={<Report />} />
        <Route path="/all/group" element={<App />} />
        <Route path="/create/group" element={<Create />} />
        <Route path="/extend/group" element={<Create />} />
        <Route path="/login/teacher" element={< LoginTeacher/>} />
        <Route path="/register/teacher" element={<RegisterTeacher />} />
        <Route path="/login/student" element={<App />} />
        <Route path="/register/student" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
