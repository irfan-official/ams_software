import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Report from "./Report.jsx";
import LoginTeacher from "./LoginTeacher.jsx";
import RegisterTeacher from "./RegisterTeacher.jsx";
import Overview from "./Overview.jsx";
import CreateGroup from "./createGroup.jsx";
import UpdateGroup from "./UpdateGroup.jsx";
import ExtendGroup from "./ExtendGroup.jsx";
import Context from "./context/Context.jsx";
import Protected from "./Protected.jsx";
import Chart from "./Chart.jsx";
import AllChart from "./AllChart.jsx";
import Mobile from "./Mobile.jsx";
import AllStudents from "./AllStudents.jsx";
import AllSupervisors from "./AllSupervisors.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/overview" element={<Overview />} />
            <Route path="/report" element={<Report />} />
            <Route path="/update/group" element={<UpdateGroup />} />
            <Route path="/extend/group" element={<ExtendGroup />} />
          </Route>

          <Route path="/" element={<App />} />
          <Route path="/create/group" element={<CreateGroup />} />
          <Route path="/add/student" element={<App />} />

          <Route path="/login/teacher" element={<LoginTeacher />} />
          <Route path="/register/teacher" element={<RegisterTeacher />} />

          <Route path="/login/student" element={<App />} />
          <Route path="/register/student" element={<App />} /> 

          <Route path="/admin/show/all_students" element={<AllStudents />} />
          <Route path="/admin/show/all_supervisors" element={<AllSupervisors />} />

          <Route path="/show/all_students" element={<AllStudents />} />
          <Route path="/show/all_supervisors" element={<AllSupervisors />} />

          <Route path="/admin/login" element={<AllSupervisors />} />
          <Route path="/admin/register" element={<AllSupervisors />} />
          <Route path="/add/admin_user" element={<AllSupervisors />} />


          <Route path="/chart" element={<Chart />} />
          <Route path="/all-chart" element={<AllChart />} />
          <Route path="/mobile" element={<Mobile />} />
        </Routes>
      </BrowserRouter>
    </Context>
  </StrictMode>
);
