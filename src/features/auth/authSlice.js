import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* Login */
export const loginUser = createAsyncThunk(
	"auth/login",
	async (data, thunkAPI) => {
		try {
			const res = await api.post("/api/auth/login", data);
			return res.data.user;
		} catch (err) {
			return thunkAPI.rejectWithValue(
				err.response?.data?.message || "Login failed"
			);
		}
	}
);

/* Register */
export const registerUser = createAsyncThunk(
	"auth/register",
	async (data, thunkAPI) => {
		try {
			await api.post("/api/auth/register", data);
		} catch (err) {
			return thunkAPI.rejectWithValue("Registration failed");
		}
	}
);

/* Load user */
export const loadUser = createAsyncThunk(
	"auth/loadUser",
	async (_, thunkAPI) => {
		try {
			const res = await api.get("/api/auth/me");
			return res.data.user;
		} catch {
			return thunkAPI.rejectWithValue("Not authenticated");
		}
	}
);

/* Logout */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
	await api.post("/api/auth/logout");
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: true,
		error: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder

			/* Load User */
			.addCase(loadUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loadUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(loadUser.rejected, (state) => {
				state.user = null;
				state.loading = false;
			})

			/* Login */
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = {
					_id: action.payload.id || action.payload._id,
					name: action.payload.name,
					email: action.payload.email,
				};
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.error = action.payload;
			})

			/* Register */
			.addCase(registerUser.fulfilled, (state) => {
				state.error = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.error = action.payload;
			})

			/* Logout */
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
