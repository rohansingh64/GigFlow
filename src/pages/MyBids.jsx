import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBids } from "../features/bids/bidSlice";
import { Link } from "react-router-dom";

function MyBids() {
	const dispatch = useDispatch();
	const { myBids } = useSelector((state) => state.bids);

	useEffect(() => {
		dispatch(fetchMyBids());
	}, []);

	return (
		<div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-10">
			<h1 className="text-3xl font-bold mb-8 text-slate-800 tracking-tight">
				My Bids
			</h1>

			<div className="space-y-5">
				{myBids.map((bid) => (
					<div
						key={bid._id}
						className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
					>
						{bid.gigId ? (
							<>
								<div className="flex items-start justify-between gap-4">
									<div>
										<h2 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
											{bid.gigId.title}
										</h2>

										<p className="mt-1 text-sm text-slate-500">
											Bid Amount:{" "}
											<span className="font-medium text-slate-700">
												₹{bid.price}
											</span>
										</p>

										<p className="mt-1 text-sm">
											Status:{" "}
											<span
												className={`font-medium ${
													bid.status === "accepted"
														? "text-green-600"
														: bid.status === "rejected"
														? "text-red-500"
														: "text-amber-500"
												}`}
											>
												{bid.status}
											</span>
										</p>
									</div>
								</div>

								<div className="mt-4">
									<Link
										to={`/gig/${bid.gigId._id}`}
										className="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
									>
										View Gig →
									</Link>
								</div>
							</>
						) : (
							<p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
								Gig removed
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default MyBids;
