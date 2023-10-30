import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../screens/auth/Login";
import Auth from "../authentication/Auth";
import Dashboard from "../screens/admin/Dashboard";
import ThankYou from "../screens/admin/ThankYou";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/success" element={<ThankYou />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
