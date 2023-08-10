import { createSlice } from "@reduxjs/toolkit";
import { getCallClients } from "../../apis/getDataApis";

const callClientsSlice = createSlice({
	name: "walk-in",
	initialState: {
		clients: [],
		isloading: false,
		isError: false,
		isSuccess: false,
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(getCallClients.pending, (state, { payload }) => {
				state.isloading = true;
				state.isError = false;
				state.isSuccess = false;
			})
			.addMatcher(getCallClients.fulfilled, (state, { payload }) => {
				state.clients = payload;
				state.isloading = false;
				state.isError = false;
				state.isSuccess = false;
			})
			.addMatcher(getCallClients.rejected, (state, { payload }) => {
				state.isError = true;
				state.isloading = false;
				state.isSuccess = false;
				// state.clients = payload;
			});
	},
});

export default callClientsSlice.reducer;
