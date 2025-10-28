import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  registerAction,
} from "../../Redux/slices/users/userSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import { useNavigate } from "react-router-dom";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, success } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.status == "success") {
      navigate("/login");
    }
  }, [user?.status]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    dispatch(
      registerAction({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              sign in to existing account
            </a>
          </p>
        </div>

        {error && <ErrorMsg message="Error in registering" />}
        {success && <SuccessMsg message="User Register Successfully" />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-emerald-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
              />
            </div>
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

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the Terms and Privacy Policy
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
            >
              {loading ? <LoadingComponent /> : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
