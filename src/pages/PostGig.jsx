import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGig } from "../features/gigs/gigSlice";
import { useNavigate } from "react-router-dom";

function PostGig() {
	const [form, setForm] = useState({ title: "", description: "", budget: "" });
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		await dispatch(createGig(form));
		navigate("/");
	};

	return (
		<div className="flex justify-center mt-20 px-4">
			<form
				className="
          bg-white 
          p-8 
          w-full 
          max-w-md 
          rounded-2xl 
          shadow-lg 
          border 
          border-gray-100
          transition-all 
          duration-300
          hover:shadow-2xl
        "
				onSubmit={submit}
			>
				<h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
					Post a Gig
				</h2>

				<input
					className="
            border 
            border-gray-300 
            p-3 
            w-full 
            mb-4 
            rounded-lg 
            outline-none 
            transition-all 
            duration-200
            focus:border-blue-500 
            focus:ring-2 
            focus:ring-blue-100
            placeholder-gray-400
          "
					placeholder="Title"
					onChange={(e) => setForm({ ...form, title: e.target.value })}
				/>

				<textarea
					className="
            border 
            border-gray-300 
            p-3 
            w-full 
            mb-4 
            rounded-lg 
            outline-none 
            resize-none
            min-h-30
            transition-all 
            duration-200
            focus:border-blue-500 
            focus:ring-2 
            focus:ring-blue-100
            placeholder-gray-400
          "
					placeholder="Description"
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
				/>

				<input
					className="
            border 
            border-gray-300 
            p-3 
            w-full 
            mb-6 
            rounded-lg 
            outline-none 
            transition-all 
            duration-200
            focus:border-blue-500 
            focus:ring-2 
            focus:ring-blue-100
            placeholder-gray-400
          "
					placeholder="Budget"
					type="number"
					onChange={(e) => setForm({ ...form, budget: e.target.value })}
				/>

				<button
					className="
            bg-linear-to-r 
            from-blue-600 
            to-blue-500 
            text-white 
            w-full 
            py-3 
            rounded-lg 
            font-semibold
            transition-all 
            duration-300
            hover:from-blue-700 
            hover:to-blue-600
            hover:scale-[1.02]
            active:scale-95
            shadow-md
            hover:shadow-xl
          "
				>
					Post Gig
				</button>
			</form>
		</div>
	);
}

export default PostGig;
