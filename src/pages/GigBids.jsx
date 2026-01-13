import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGigBids, hireBid } from "../features/bids/bidSlice";

function GigBids() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gigBids } = useSelector(state => state.bids);

  useEffect(() => {
    dispatch(fetchGigBids(id));
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Bids</h1>

      {gigBids.map(bid => (
        <div key={bid._id} className="border p-4 mb-3 bg-white shadow">
          <p><b>{bid.freelancerId.name}</b></p>
          <p>{bid.message}</p>
          <p>₹{bid.price}</p>
          <p>Status: {bid.status}</p>

          {bid.status === "pending" && (
            <button
              onClick={() => dispatch(hireBid(bid._id))}
              className="bg-green-600 text-white px-4 py-1 mt-2"
            >
              Hire
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default GigBids;
