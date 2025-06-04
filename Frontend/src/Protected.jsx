// components/Protected.jsx
import { Outlet, Navigate } from "react-router-dom";

const Protected = () => {
  const groupID = localStorage.getItem("groupID"); // or your own logic

  return groupID ? <Outlet /> : <Navigate to="/" replace />;
};

export default Protected;
