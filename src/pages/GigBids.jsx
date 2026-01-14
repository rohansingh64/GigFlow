import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGigBids, hireBid } from "../features/bids/bidSlice";

function GigBids() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { gigBids } = useSelector((state) => state.bids);

	useEffect(() => {
		dispatch(fetchGigBids(id));
	}, [id]);

	return (
		<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-6 md:p-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">
					Bids for this Gig
				</h1>

				{gigBids.length === 0 && (
					<div className="text-center py-16 bg-white rounded-xl shadow-sm border">
						<p className="text-gray-500 text-lg">No bids received yet.</p>
					</div>
				)}

				<div className="space-y-5">
					{gigBids.map((bid) => (
						<div
							key={bid._id}
							className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300"
						>
							<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
								{/* Left content */}
								<div>
									<p className="text-lg font-semibold text-gray-800">
										{bid.freelancerId.name}
									</p>

									<p className="text-gray-600 mt-1 leading-relaxed">
										{bid.message}
									</p>

									<div className="flex flex-wrap items-center gap-4 mt-3">
										<span className="text-green-600 font-bold text-lg">
											₹{bid.price}
										</span>

										<span
											className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
									bid.status === "pending"
										? "bg-yellow-100 text-yellow-700"
										: bid.status === "hired"
										? "bg-green-100 text-green-700"
										: "bg-gray-100 text-gray-600"
								}
                      `}
										>
											{bid.status}
										</span>
									</div>
								</div>

								{/* Right action */}
								{bid.status === "pending" && (
									<button
										onClick={() => dispatch(hireBid(bid._id))}
										className="self-start md:self-center bg-linear-to-r from-green-500 to-green-600 
                               text-white px-6 py-2 rounded-lg font-semibold
                               hover:from-green-600 hover:to-green-700
                               active:scale-95 transition-all duration-200 shadow-md"
									>
										Hire
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default GigBids;
