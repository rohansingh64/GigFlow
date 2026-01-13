import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "../features/gigs/gigSlice";
import { Link } from "react-router-dom";

function MyGigs() {
  const { list } = useSelector(state => state.gigs);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyGigs());
  }, [dispatch]);

  const myGigs = list.filter(g => g.ownerId === user._id);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">My Gigs</h1>

      {myGigs.map(gig => (
        <div key={gig._id} className="border p-4 mb-3 bg-white shadow">
          <h2 className="text-lg font-semibold">{gig.title}</h2>

          <p className="text-gray-600">
            Budget: ₹{gig.budget}
          </p>

          <p className="mt-1">
            Status:
            <span
              className={`ml-2 font-semibold ${
                gig.status === "open"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {gig.status.toUpperCase()}
            </span>
          </p>

          <Link
            to={`/my-gig/${gig._id}`}
            className="text-blue-600 mt-2 inline-block"
          >
            View Bids
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyGigs;
