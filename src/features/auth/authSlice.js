import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* Login */
export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Login failed"
    );
  }
});

/* Register */
export const registerUser = createAsyncThunk("auth/register", async (data) => {
  await api.post("/api/auth/register", data);
});

/* Load user from cookie */
export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    const res = await api.get("/api/auth/me");
    return res.data;
  } catch {
    return null; // not logged in
  }
});

/* Logout */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/api/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* loadUser */
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

      /* login */
      .addCase(loginUser.fulfilled, (state, action) => {
        // normalize id
        state.user = {
          _id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* logout */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
