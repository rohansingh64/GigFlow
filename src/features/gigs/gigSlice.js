import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ============================
   Fetch all OPEN gigs (public)
============================= */
export const fetchGigs = createAsyncThunk("gigs/fetchAll", async () => {
  const res = await api.get("/api/gigs");
  return res.data;
});

/* ============================
   Fetch gigs posted by me
============================= */
export const fetchMyGigs = createAsyncThunk("gigs/my", async () => {
  const res = await api.get("/api/gigs/my");
  return res.data;
});

/* ============================
   Create new gig
============================= */
export const createGig = createAsyncThunk("gigs/create", async (data) => {
  const res = await api.post("/api/gigs", data);
  return res.data;
});

/* ============================
   Fetch single gig
============================= */
export const fetchGig = createAsyncThunk("gigs/fetchOne", async (id) => {
  const res = await api.get(`/api/gigs/${id}`);
  return res.data;
});

/* ============================
   Slice
============================= */
const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    list: [],        // Used for Home or My Gigs depending on route
    current: null,   // Current gig details
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* Public gigs */
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchGigs.rejected, (state) => {
        state.loading = false;
      })

      /* My gigs */
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyGigs.rejected, (state) => {
        state.loading = false;
      })

      /* Single gig */
      .addCase(fetchGig.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      /* Create gig */
      .addCase(createGig.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  }
});

export default gigSlice.reducer;
