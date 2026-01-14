import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGigs } from "../features/gigs/gigSlice";
import { Link } from "react-router-dom";

function MyGigs() {
	const { list } = useSelector((state) => state.gigs);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMyGigs());
	}, [dispatch]);

	const myGigs = list.filter((g) => g.ownerId === user._id);

	return (
		<div className="min-h-screen bg-gray-50 px-6 py-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">My Gigs</h1>

				{myGigs.map((gig) => (
					<div
						key={gig._id}
						className="mb-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					>
						<h2 className="text-xl font-semibold text-gray-900 mb-1">
							{gig.title}
						</h2>

						<p className="text-gray-600 mb-2">
							Budget:{" "}
							<span className="font-medium text-gray-800">
								₹{gig.budget}
							</span>
						</p>

						<p className="flex items-center gap-2 mb-4">
							<span className="text-gray-700">Status:</span>

							<span
								className={`rounded-full px-3 py-1 text-sm font-semibold ${
									gig.status === "open"
										? "bg-green-100 text-green-700"
										: "bg-blue-100 text-blue-700"
								}`}
							>
								{gig.status.toUpperCase()}
							</span>
						</p>

						<Link
							to={`/my-gig/${gig._id}`}
							className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-md active:scale-95"
						>
							View Bids
						</Link>
					</div>
				))}

				{myGigs.length === 0 && (
					<div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
						You haven’t posted any gigs yet.
					</div>
				)}
			</div>
		</div>
	);
}

export default MyGigs;
