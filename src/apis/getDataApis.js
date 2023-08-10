import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../lib/api";

export const getWalkinClients = createAsyncThunk("get-clients", async () => {
	const { data, error } = await supabase.from("walk-in-clients").select();
	if (error) {
		return error;
	}
	return data;
});

export const getCallClients = createAsyncThunk("get-call-clients", async () => {
	const { data, error } = await supabase.from("reception-clients").select();
	if (error) {
		return error;
	}
	return data;
});
