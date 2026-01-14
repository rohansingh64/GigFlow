import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

function Navbar() {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = async () => {
		await dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
			{/* Logo */}
			<Link
				to="/"
				className="text-2xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
			>
				GigFlow
			</Link>

			{user ? (
				<div className="flex items-center gap-6">
					<Link
						to="/post-gig"
						className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-300"
					>
						Post Gig
					</Link>

					<Link
						to="/my-gigs"
						className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-300"
					>
						My Gigs
					</Link>

					<Link
						to="/my-bids"
						className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-300"
					>
						My Bids
					</Link>

					<Link
						to="/profile"
						className="text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-300"
					>
						Profile
					</Link>

					<button
						onClick={logout}
						className="ml-4 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 transition-all duration-300 active:scale-95"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link
						to="/login"
						className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
					>
						Login
					</Link>

					<Link
						to="/register"
						className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
					>
						Register
					</Link>
				</div>
			)}
		</div>
	);
}

export default Navbar;
