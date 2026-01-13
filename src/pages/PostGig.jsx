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
    <div className="flex justify-center mt-20">
      <form className="bg-white p-8 shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Post a Gig</h2>

        <input className="border p-2 w-full mb-3"
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea className="border p-2 w-full mb-3"
          placeholder="Description"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Budget"
          type="number"
          onChange={e => setForm({ ...form, budget: e.target.value })}
        />

        <button className="bg-blue-600 text-white w-full py-2">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostGig;
