import React from "react";
import useAuth from "../hooks/userAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/admin/Dashboard";
import ThankYou from "../screens/admin/ThankYou";

const Auth = () => {
  const token = useAuth();
  return !token ? (
    <Navigate to={"/"} />
  ) : (
    <div>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/success" element={<ThankYou />} />
      </Routes>
    </div>
  );
};

export default Auth;
