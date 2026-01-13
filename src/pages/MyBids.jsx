import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBids } from "../features/bids/bidSlice";
import { Link } from "react-router-dom";

function MyBids() {
  const dispatch = useDispatch();
  const { myBids } = useSelector(state => state.bids);

  useEffect(() => {
    dispatch(fetchMyBids());
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">My Bids</h1>

      {myBids.map(bid => (
        <div key={bid._id} className="border p-4 mb-3 bg-white shadow">
          {bid.gigId ? (
            <>
              <h2 className="font-semibold">{bid.gigId.title}</h2>
              <p>₹{bid.price}</p>
              <p>Status: {bid.status}</p>

              <Link
                to={`/gig/${bid.gigId._id}`}
                className="text-blue-600"
              >
                View Gig
              </Link>
            </>
          ) : (
            <p className="text-red-500">Gig removed</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBids;
