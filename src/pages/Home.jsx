import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../features/gigs/gigSlice";
import { Link } from "react-router-dom";

function Home() {
	const dispatch = useDispatch();
	const { list, loading } = useSelector((state) => state.gigs);

	// ✅ ONLY ADDITION
	const [search, setSearch] = useState("");

	useEffect(() => {
		dispatch(fetchGigs());
	}, [dispatch]);

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-[60vh] text-lg font-medium text-gray-600 animate-pulse">
				Loading gigs...
			</div>
		);

	// ✅ ONLY ADDITION (filtered gigs)
	const filteredGigs = list.filter(
		(gig) =>
			gig.title.toLowerCase().includes(search.toLowerCase()) ||
			gig.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="px-6 py-10 max-w-6xl mx-auto">
			<h1 className="text-4xl font-extrabold mb-8 text-gray-800">
				Open Gigs
			</h1>

			{/* ✅ SEARCH INPUT */}
			<input
				type="text"
				placeholder="Search gigs by title or description..."
				className="w-full mb-10 px-4 py-3 rounded-xl border border-gray-300 
				focus:outline-none focus:ring-2 focus:ring-blue-500 
				focus:border-transparent transition-all duration-300 
				placeholder-gray-400 shadow-sm"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{filteredGigs.length === 0 ? (
				<p className="text-center text-gray-500 text-lg">No gigs found</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredGigs.map((gig) => (
						<div
							key={gig._id}
							className="bg-white rounded-2xl p-6 shadow-md 
							hover:shadow-xl hover:-translate-y-1 
							transition-all duration-300 border border-gray-100"
						>
							<h2 className="text-xl font-semibold text-gray-800 mb-2">
								{gig.title}
							</h2>

							<p className="text-gray-600 mb-4 line-clamp-3">
								{gig.description}
							</p>

							<p className="text-lg font-bold text-green-600 mb-4">
								₹{gig.budget}
							</p>

							<Link
								to={`/gig/${gig._id}`}
								className="inline-block text-sm font-medium 
								text-blue-600 hover:text-white 
								border border-blue-600 hover:bg-blue-600 
								px-4 py-2 rounded-lg 
								transition-all duration-300"
							>
								View Details →
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Home;
