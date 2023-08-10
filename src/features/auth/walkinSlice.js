import { createSlice } from "@reduxjs/toolkit";
import { getWalkinClients } from "../../apis/getDataApis";

const walkInSlice = createSlice({
	name: "walk-in",
	initialState: {
		clients: [],
		isloading: false,
		isError: false,
		isSuccess: false,
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(getWalkinClients.pending, (state, { payload }) => {
				state.isloading = true;
				state.isError = false;
				state.isSuccess = false;
				state.clients = [];
			})
			.addMatcher(getWalkinClients.fulfilled, (state, { payload }) => {
				state.clients = payload;
				state.isloading = false;
				state.isError = false;
				state.isSuccess = false;
			})
			.addMatcher(getWalkinClients.rejected, (state, { payload }) => {
				state.isError = true;
				state.isloading = false;
				state.isSuccess = false;
				// state.clients = [];
			});
	},
});

export default walkInSlice.reducer;
