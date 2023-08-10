import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import walkinSlice from "../features/auth/walkinSlice";
import callClientsSlice from "../features/auth/callClients";

export const reducers = combineReducers({
	auth: authSlice,
	walkIn: walkinSlice,
	call: callClientsSlice,
});
