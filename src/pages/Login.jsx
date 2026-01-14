import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(clearError()); // clear stale error on page load
	}, [dispatch]);

	const submit = async (e) => {
		e.preventDefault();
		const res = await dispatch(loginUser(form));

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/");
		}
	};

	return (
		<div className="min-h-screen flex items-start justify-center bg-linear-to-br from-blue-50 to-indigo-100 pt-20">
			<form
				className="bg-white p-8 w-96 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
				onSubmit={submit}
			>
				<h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
					Welcome Back
				</h2>

				<input
					className="border border-gray-300 p-3 w-full mb-4 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent transition"
					placeholder="Email"
					onChange={(e) => {
						setForm({ ...form, email: e.target.value });
						dispatch(clearError());
					}}
				/>

				<input
					type="password"
					className="border border-gray-300 p-3 w-full mb-4 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent transition"
					placeholder="Password"
					onChange={(e) => {
						setForm({ ...form, password: e.target.value });
						dispatch(clearError());
					}}
				/>

				{error && (
					<p className="text-red-500 text-sm mb-4 text-center animate-pulse">
						{error}
					</p>
				)}

				<button
					className="bg-blue-600 text-white w-full py-3 rounded-lg font-medium
                     hover:bg-blue-700 active:scale-[0.98]
                     transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
