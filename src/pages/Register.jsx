import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(clearError()); // clear stale error on page load
	}, [dispatch]);

	const submit = async (e) => {
		e.preventDefault();
		const res = await dispatch(registerUser(form));

		if (res.meta.requestStatus === "fulfilled") {
			navigate("/login");
		}
	};

	return (
		<div className="min-h-screen flex items-start justify-center bg-linear-to-br from-blue-50 via-white to-indigo-50 pt-20">
			<form
				onSubmit={submit}
				className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
			>
				<h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
					Create Account
				</h2>

				<input
					className="w-full mb-4 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
					placeholder="Name"
					onChange={(e) => {
						setForm({ ...form, name: e.target.value });
						dispatch(clearError());
					}}
				/>

				<input
					className="w-full mb-4 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
					placeholder="Email"
					onChange={(e) => {
						setForm({ ...form, email: e.target.value });
						dispatch(clearError());
					}}
				/>

				<input
					type="password"
					className="w-full mb-4 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-all duration-200"
					placeholder="Password"
					onChange={(e) => {
						setForm({ ...form, password: e.target.value });
						dispatch(clearError());
					}}
				/>

				{error && (
					<p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
						{error}
					</p>
				)}

				<button
					className="w-full mt-2 py-2.5 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600
                     text-white font-medium tracking-wide
                     hover:from-blue-700 hover:to-indigo-700
                     active:scale-[0.98]
                     transition-all duration-200 shadow-md hover:shadow-lg"
				>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
