import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchGig } from "../features/gigs/gigSlice";
import { fetchMyBids, placeBid } from "../features/bids/bidSlice";

function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { current } = useSelector(state => state.gigs);
  const { user } = useSelector(state => state.auth);
  const { myBids } = useSelector(state => state.bids);

  const [bid, setBid] = useState({ message: "", price: "" });

  useEffect(() => {
    dispatch(fetchGig(id));
    if (user) {
      dispatch(fetchMyBids());
    }
  }, [id, user, dispatch]);

  if (!current) return <div className="p-10">Loading...</div>;

  const isOwner = user && user._id === current.ownerId;

  const alreadyBid = myBids.find(
    (b) => b.gigId && b.gigId._id === current._id
  );

  const canBid = user && !isOwner && !alreadyBid && current.status === "open";

  const submit = () => {
    dispatch(placeBid({ gigId: current._id, ...bid }));
    setBid({ message: "", price: "" });
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      {/* Gig info */}
      <h1 className="text-3xl font-bold mb-2">{current.title}</h1>
      <p className="mb-3">{current.description}</p>
      <p className="font-semibold">Budget: ₹{current.budget}</p>
      <p className="text-gray-600 mt-1">
        Status: {current.status.toUpperCase()}
      </p>

      {/* Not logged in */}
      {!user && (
        <div className="mt-6 bg-yellow-100 p-4 rounded">
          <p className="mb-2">Login to place a bid.</p>
          <Link to="/login" className="text-blue-600 underline">
            Go to Login
          </Link>
        </div>
      )}

      {/* Owner */}
      {isOwner && user && (
        <p className="mt-6 text-yellow-600 font-semibold">
          You posted this gig.
        </p>
      )}

      {/* Already bid */}
      {alreadyBid && user && (
        <p className="mt-6 text-blue-600 font-semibold">
          You already placed a bid on this gig.
        </p>
      )}

      {/* Assigned */}
      {current.status === "assigned" && (
        <p className="mt-6 text-green-600 font-semibold">
          This gig has already been assigned.
        </p>
      )}

      {/* Bid form */}
      {canBid && user && (
        <div className="mt-8 border p-6 rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-3">Place a Bid</h2>

          <textarea
            placeholder="Why should you be hired?"
            className="border p-2 w-full mb-3"
            value={bid.message}
            onChange={(e) => setBid({ ...bid, message: e.target.value })}
          />

          <input
            type="number"
            placeholder="Your price"
            className="border p-2 w-full mb-3"
            value={bid.price}
            onChange={(e) => setBid({ ...bid, price: e.target.value })}
          />

          <button
            onClick={submit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Bid
          </button>
        </div>
      )}
    </div>
  );
}

export default GigDetails;
