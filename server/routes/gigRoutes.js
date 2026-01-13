const express = require("express");
const Gig = require("../models/Gig");
const protect = require("../middleware/authMiddleware");
const {
  getGigs,
  createGig
} = require("../controllers/gigController");

const router = express.Router();

/*
  GET /api/gigs/my
  Protected – get logged-in user's gigs
  ⚠ MUST come before /:id
*/
router.get("/my", protect, async (req, res) => {
  try {
    const gigs = await Gig.find({ ownerId: req.user });
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*
  GET /api/gigs
  Public – get all open gigs with search
*/
router.get("/", getGigs);

/*
  GET /api/gigs/:id
  Public – get single gig by ID
*/
router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: "Invalid gig ID" });
  }
});

/*
  POST /api/gigs
  Protected – create a gig
*/
router.post("/", protect, createGig);

module.exports = router;
