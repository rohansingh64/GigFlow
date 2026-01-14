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
    <div className="flex justify-center mt-20">
      <form className="bg-white p-8 shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            dispatch(clearError());
          }}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            dispatch(clearError());
          }}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            dispatch(clearError());
          }}
        />

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <button className="bg-blue-600 text-white w-full py-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
