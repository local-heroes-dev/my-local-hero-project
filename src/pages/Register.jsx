// File: Register.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "../schema/authSchema";
import { register as registerAccount } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });



  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nominate");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerAccount(data));
    } catch (err) {
      console.error("register failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Link to="/login" className="text-orange-500 text-sm mb-2">
        &larr; Back to Login
      </Link>
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-center">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Join the community to recognize heroes
        </p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full border rounded px-4 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-orange-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
