import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

function Navbar() {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logout = async () => {
		await dispatch(logoutUser());
		navigate("/"); // 👈 Redirect to Home after logout
	};

	return (
		<div className="flex justify-between p-4 bg-white shadow">
			<Link to="/" className="text-xl font-bold">
				GigFlow
			</Link>

			{user ? (
				<div className="space-x-4">
					<Link to="/post-gig">Post Gig</Link>
					<Link to="/my-gigs">My Gigs</Link>
					<Link to="/my-bids">My Bids</Link>
					<Link to="/profile">Profile</Link>

					<button onClick={logout} className="text-red-600 font-semibold">
						Logout
					</button>
				</div>
			) : (
				<div className="space-x-4">
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</div>
			)}
		</div>
	);
}

export default Navbar;
