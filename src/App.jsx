import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostGig from "./pages/PostGig";
import GigDetails from "./pages/GigDetails";
import MyGigs from "./pages/MyGigs";
import GigBids from "./pages/GigBids";
import MyBids from "./pages/MyBids";
import Profile from "./pages/Profile";

function App() {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	if (loading) return <div className="p-10">Loading...</div>;

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				{/* Public */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/gig/:id" element={<GigDetails />} />

				{/* Protected */}
				<Route
					path="/post-gig"
					element={
						<ProtectedRoute>
							<PostGig />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/my-gigs"
					element={
						<ProtectedRoute>
							<MyGigs />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/my-gig/:id"
					element={
						<ProtectedRoute>
							<GigBids />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/my-bids"
					element={
						<ProtectedRoute>
							<MyBids />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
