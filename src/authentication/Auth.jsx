import React from "react";
import useAuth from "../hooks/userAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../screens/admin/Dashboard";

const Auth = () => {
	const token = useAuth();
	return !token ? (
		<Navigate to={"/"} />
	) : (
		<div>
			<Routes>
				<Route path='/dashboard/*' element={<Dashboard />} />
			</Routes>
		</div>
	);
};

export default Auth;
