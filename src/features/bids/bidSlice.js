import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ===========================
   Place a Bid
=========================== */
export const placeBid = createAsyncThunk(
  "bids/place",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/api/bids", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to place bid"
      );
    }
  }
);

/* ===========================
   Get Bids for a Gig (Client)
=========================== */
export const fetchGigBids = createAsyncThunk(
  "bids/fetchGig",
  async (gigId, thunkAPI) => {
    try {
      const res = await api.get(`/api/bids/${gigId}`);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to load bids");
    }
  }
);

/* ===========================
   Get My Bids (Freelancer)
=========================== */
export const fetchMyBids = createAsyncThunk(
  "bids/fetchMy",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/bids/my");
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Failed to load your bids");
    }
  }
);

/* ===========================
   Hire a Bid
=========================== */
export const hireBid = createAsyncThunk(
  "bids/hire",
  async (bidId, thunkAPI) => {
    try {
      await api.patch(`/api/bids/${bidId}/hire`);
      return bidId;
    } catch {
      return thunkAPI.rejectWithValue("Failed to hire freelancer");
    }
  }
);

/* ===========================
   Slice
=========================== */
const bidSlice = createSlice({
  name: "bids",
  initialState: {
    gigBids: [],   // bids for a selected gig (client)
    myBids: [],    // bids placed by logged-in freelancer
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* Fetch gig bids */
      .addCase(fetchGigBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGigBids.fulfilled, (state, action) => {
        state.gigBids = action.payload;
        state.loading = false;
      })
      .addCase(fetchGigBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* Fetch my bids */
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.myBids = action.payload;
      })

      /* Place bid */
      .addCase(placeBid.fulfilled, (state, action) => {
        state.myBids.push(action.payload);
      })

      /* Hire */
      .addCase(hireBid.fulfilled, (state, action) => {
        const hiredId = action.payload;

        // Update gig bids list
        state.gigBids = state.gigBids.map(bid =>
          bid._id === hiredId
            ? { ...bid, status: "hired" }
            : { ...bid, status: "rejected" }
        );

        // Update freelancer dashboard if needed
        state.myBids = state.myBids.map(bid =>
          bid._id === hiredId
            ? { ...bid, status: "hired" }
            : bid.gigId === state.gigBids[0]?.gigId
              ? { ...bid, status: "rejected" }
              : bid
        );
      });
  }
});

export default bidSlice.reducer;
