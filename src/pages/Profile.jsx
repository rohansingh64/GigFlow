import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "../features/gigs/gigSlice";
import { fetchMyBids } from "../features/bids/bidSlice";

function Profile() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { list } = useSelector((state) => state.gigs);
	const { myBids } = useSelector((state) => state.bids);

	useEffect(() => {
		dispatch(fetchMyGigs());
		dispatch(fetchMyBids());
	}, []);

	const myGigs = list.filter((g) => g.ownerId === user._id);

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
			<div className="max-w-4xl mx-auto">
				{/* Heading */}
				<h1 className="text-4xl font-bold text-slate-800 mb-8 tracking-tight">
					Profile
				</h1>

				{/* User Info Card */}
				<div className="bg-white/80 backdrop-blur-lg border border-slate-200 shadow-lg rounded-2xl p-8 mb-8 transition hover:shadow-xl">
					<div className="space-y-3">
						<p className="text-lg text-slate-700">
							<span className="font-semibold text-slate-900">Name:</span>{" "}
							{user.name}
						</p>
						<p className="text-lg text-slate-700">
							<span className="font-semibold text-slate-900">
								Email:
							</span>{" "}
							{user.email}
						</p>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{/* Gigs Posted */}
					<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl">
						<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]" />
						<p className="text-4xl font-bold mb-1">{myGigs.length}</p>
						<p className="text-sm uppercase tracking-wide opacity-90">
							Gigs Posted
						</p>
					</div>

					{/* Bids Placed */}
					<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl">
						<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]" />
						<p className="text-4xl font-bold mb-1">{myBids.length}</p>
						<p className="text-sm uppercase tracking-wide opacity-90">
							Bids Placed
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
