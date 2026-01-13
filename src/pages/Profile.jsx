import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "../features/gigs/gigSlice";
import { fetchMyBids } from "../features/bids/bidSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { list } = useSelector(state => state.gigs);
  const { myBids } = useSelector(state => state.bids);

  useEffect(() => {
    dispatch(fetchMyGigs());
    dispatch(fetchMyBids());
  }, []);

  const myGigs = list.filter(g => g.ownerId === user._id);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white shadow p-6 rounded mb-6">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-100 p-6 rounded">
          <p className="text-xl font-bold">{myGigs.length}</p>
          <p>Gigs Posted</p>
        </div>

        <div className="bg-green-100 p-6 rounded">
          <p className="text-xl font-bold">{myBids.length}</p>
          <p>Bids Placed</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
