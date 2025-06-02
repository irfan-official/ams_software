import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Report from "./Report.jsx";
import LoginTeacher from "./LoginTeacher.jsx";
import RegisterTeacher from "./RegisterTeacher.jsx"
import Overview from "./Overview.jsx";
import CreateGroup from "./createGroup.jsx";
import UpdateGroup from "./UpdateGroup.jsx";
import ExtendGroup from "./ExtendGroup.jsx";
import Context from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/overview" element={<Overview/>} />
        <Route path="/report" element={<Report />} />

        <Route path="/create/group" element={<CreateGroup />} />
        <Route path="/update/group" element={<UpdateGroup />} />
        <Route path="/extend/group" element={<ExtendGroup />} />

        <Route path="/login/teacher" element={< LoginTeacher/>} />
        <Route path="/register/teacher" element={<RegisterTeacher />} />

        <Route path="/login/student" element={<App />} />
        <Route path="/register/student" element={<App />} />
      </Routes>
    </BrowserRouter>
    </Context>
  </StrictMode>
);
