import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../lib/api";

export const getPassWordReset = createAsyncThunk("reset-password", async ({ email }, thunkAPI) => {
	let { data, error } = await supabase.auth.resetPasswordForEmail(email);
	if (data) {
		console.log(data);
	} else if (error) {
		console.log(error);
	}
});

export const changePassword = createAsyncThunk("change-password", async ({ password }, thunkAPI) => {});
