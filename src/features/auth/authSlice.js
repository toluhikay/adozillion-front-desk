import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/api";

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
	access_token: "",
};

export const userLogin = createAsyncThunk("get/user-signIn", async ({ email, password }, thunkAPI) => {
	const response = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	return response;
});

export const userLogOut = createAsyncThunk("logOutUser", async () => {
	const { error } = await supabase.auth.signOut();
	console.log(error);
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducer: {
		setUserDetail: (state, { payload }) => {
			state.user = payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addMatcher(userLogin.pending, (state, { payload }) => {
				state.isError = true;
			})
			.addMatcher(userLogin.fulfilled, (state, { payload }) => {
				state.user = payload;
				state.access_token = payload?.access_token;
			})
			.addMatcher(userLogin.rejected, (state, { payload }) => {
				state.user = null;
				state.isError = true;
			});
	},
});

export const { setUserDetail } = authSlice.actions;

export default authSlice.reducer;
