const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createBid,
  getBids,
  hireBid
} = require("../controllers/bidController");

const Bid = require("../models/Bid");

const router = express.Router();

/*
  ORDER MATTERS!
  Static routes must come before dynamic routes
*/

// 1️⃣ Get logged-in freelancer’s bids
router.get("/my", protect, async (req, res) => {
  try {
    const bids = await Bid.find({ freelancerId: req.user })
      .populate("gigId", "title budget status");

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
});

// 2️⃣ Submit a bid
router.post("/", protect, createBid);

// 3️⃣ Get all bids for a gig (client only)
router.get("/:gigId", protect, getBids);

// 4️⃣ Hire a freelancer
router.patch("/:bidId/hire", protect, hireBid);

module.exports = router;
