import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../features/gigs/gigSlice";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(state => state.gigs);

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Open Gigs</h1>

      {list.map(gig => (
        <div key={gig._id} className="border p-4 mb-4 bg-white shadow">
          <h2 className="text-xl font-semibold">{gig.title}</h2>
          <p>{gig.description}</p>
          <p className="font-bold">₹{gig.budget}</p>

          <Link to={`/gig/${gig._id}`} className="text-blue-600">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
