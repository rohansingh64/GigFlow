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
    <div className="flex justify-center mt-20">
      <form className="bg-white p-8 shadow w-96" onSubmit={submit}>
        <h2 className="text-2xl mb-4">Login</h2>

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
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
