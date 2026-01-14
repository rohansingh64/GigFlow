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

	if (loading) return <div className="p-10">Loading...</div>;

	// ✅ ONLY ADDITION (filtered gigs)
	const filteredGigs = list.filter(
		(gig) =>
			gig.title.toLowerCase().includes(search.toLowerCase()) ||
			gig.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold mb-6">Open Gigs</h1>

			{/* ✅ SEARCH INPUT */}
			<input
				type="text"
				placeholder="Search gigs..."
				className="border p-2 w-full mb-6"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{filteredGigs.length === 0 ? (
				<p>No gigs found</p>
			) : (
				filteredGigs.map((gig) => (
					<div key={gig._id} className="border p-4 mb-4 bg-white shadow">
						<h2 className="text-xl font-semibold">{gig.title}</h2>
						<p>{gig.description}</p>
						<p className="font-bold">₹{gig.budget}</p>

						<Link to={`/gig/${gig._id}`} className="text-blue-600">
							View
						</Link>
					</div>
				))
			)}
		</div>
	);
}

export default Home;
