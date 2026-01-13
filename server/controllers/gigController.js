const Gig = require("../models/Gig");

// Create new Gig
exports.createGig = async (req, res) => {
  const { title, description, budget } = req.body;

  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId: req.user   // from auth middleware
  });

  res.status(201).json(gig);
};

// Get all open gigs (with search)
exports.getGigs = async (req, res) => {
  const search = req.query.search || "";

  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" }
  });

  res.json(gigs);
};
