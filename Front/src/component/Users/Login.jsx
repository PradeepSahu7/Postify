import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Redux/slices/users/userSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile");
    }
  }, [userAuth?.userInfo?.token]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginAction({
        email: formData.email,
        password: formData.password,
      })
    );

    setFormData({
      email: "",
      password: "",
    });
  };
  console.log("loading", loading);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              create a new account
            </a>
          </p>
        </div>

        {error && <ErrorMsg message={error.message} />}
        {success && <SuccessMsg message="Logged in Successfully" />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-emerald-600 hover:text-emerald-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
            >
              {loading ? <LoadingComponent /> : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
