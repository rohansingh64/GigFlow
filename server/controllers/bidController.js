const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

// Submit a bid
exports.createBid = async (req, res) => {
  const { gigId, message, price } = req.body;

  const gig = await Gig.findById(gigId);

  // ❌ Prevent bidding on own gig
  if (gig.ownerId.toString() === req.user) {
    return res.status(400).json({ message: "You cannot bid on your own gig" });
  }

  const bid = await Bid.create({
    gigId,
    freelancerId: req.user,
    message,
    price
  });

  res.status(201).json(bid);
};


// Get bids for a gig (only gig owner)
exports.getBids = async (req, res) => {
  const gig = await Gig.findById(req.params.gigId);

  if (gig.ownerId.toString() !== req.user) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const bids = await Bid.find({ gigId: gig._id })
    .populate("freelancerId", "name email");

  res.json(bids);
};


exports.hireBid = async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  if (!bid) return res.status(404).json({ message: "Bid not found" });

  const gig = await Gig.findById(bid.gigId);

  // Only gig owner can hire
  if (gig.ownerId.toString() !== req.user) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // 1. Mark gig as assigned
  gig.status = "assigned";
  await gig.save();

  // 2. Mark selected bid as hired
  bid.status = "hired";
  await bid.save();

  // 3. Reject all other bids for same gig
  await Bid.updateMany(
    { gigId: gig._id, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  res.json({ message: "Freelancer hired successfully" });
};
