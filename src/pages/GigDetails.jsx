import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchGig } from "../features/gigs/gigSlice";
import { fetchMyBids, placeBid } from "../features/bids/bidSlice";

function GigDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { current } = useSelector((state) => state.gigs);
	const { user } = useSelector((state) => state.auth);
	const { myBids } = useSelector((state) => state.bids);

	const [bid, setBid] = useState({ message: "", price: "" });

	useEffect(() => {
		dispatch(fetchGig(id));
		if (user) {
			dispatch(fetchMyBids());
		}
	}, [id, user, dispatch]);

	if (!current)
		return (
			<div className="min-h-[60vh] flex items-center justify-center text-lg font-medium text-gray-600">
				Loading...
			</div>
		);

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
		<div className="max-w-3xl mx-auto px-4 py-10">
			{/* Gig info */}
			<div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
				<h1 className="text-3xl font-bold text-gray-800 mb-3">
					{current.title}
				</h1>

				<p className="text-gray-600 leading-relaxed mb-4">
					{current.description}
				</p>

				<div className="flex flex-wrap items-center gap-4">
					<span className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold">
						Budget: ₹{current.budget}
					</span>

					<span
						className={`px-4 py-1 rounded-full text-sm font-semibold ${
							current.status === "open"
								? "bg-green-50 text-green-600"
								: current.status === "assigned"
								? "bg-blue-50 text-blue-600"
								: "bg-gray-100 text-gray-600"
						}`}
					>
						{current.status.toUpperCase()}
					</span>
				</div>
			</div>

			{/* Not logged in */}
			{!user && (
				<div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
					<p className="text-gray-700 mb-2">
						Login to place a bid on this gig.
					</p>
					<Link
						to="/login"
						className="inline-block font-semibold text-indigo-600 hover:text-indigo-700 transition"
					>
						Go to Login →
					</Link>
				</div>
			)}

			{/* Owner */}
			{isOwner && user && (
				<div className="mt-6 rounded-xl bg-yellow-50 border border-yellow-200 p-4">
					<p className="text-yellow-700 font-semibold">
						You posted this gig.
					</p>
				</div>
			)}

			{/* Already bid */}
			{alreadyBid && user && (
				<div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-4">
					<p className="text-blue-700 font-semibold">
						You already placed a bid on this gig.
					</p>
				</div>
			)}

			{/* Assigned */}
			{current.status === "assigned" && (
				<div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
					<p className="text-green-700 font-semibold">
						This gig has already been assigned.
					</p>
				</div>
			)}

			{/* Bid form */}
			{canBid && user && (
				<div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Place a Bid
					</h2>

					<textarea
						placeholder="Why should you be hired?"
						className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 mb-4
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition text-gray-700"
						rows="4"
						value={bid.message}
						onChange={(e) => setBid({ ...bid, message: e.target.value })}
					/>

					<input
						type="number"
						placeholder="Your price"
						className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition text-gray-700"
						value={bid.price}
						onChange={(e) => setBid({ ...bid, price: e.target.value })}
					/>

					<button
						onClick={submit}
						className="w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white
                       bg-linear-to-r from-green-500 to-emerald-600
                       hover:from-green-600 hover:to-emerald-700
                       active:scale-95 transition-all duration-200 shadow-md"
					>
						Submit Bid
					</button>
				</div>
			)}
		</div>
	);
}

export default GigDetails;
