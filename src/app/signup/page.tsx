"use client";
import Spinner from "@/components/Spinners/Spinner";
import { ISignUp } from "@/types/ISignUp";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Page() {
  const darkToastStyles: React.CSSProperties = {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  };

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<ISignUp>({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", user);
      if (res.status === 200) {
        router.push("/");
        return toast.success(res.data.message, {
          style: darkToastStyles,
        });
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response.data.error) {
        return toast.error(error.response.data.message, {
          style: darkToastStyles,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <form
        className="mt-5 border p-3 rounded"
        style={{ maxWidth: "400px" }}
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-center">Sign Up</h2>
        <p className="text-center text-muted">
          Create a free account with your email.
        </p>
        <hr />
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Write your full name here"
            required
            onChange={handleOnChange}
            autoComplete="off"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="example@email.com"
            required
            onChange={handleOnChange}
            autoComplete="off"
            disabled={loading}
          />
        </div>
        <div className="">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="d-flex align-items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="******"
              minLength={6}
              required
              onChange={handleOnChange}
              autoComplete="off"
              disabled={loading}
            />
            <button
              className="border rounded px-2 py-1"
              onClick={handleShowPassword}
              type="button"
            >
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-secondary mt-3 w-100"
          disabled={loading}
        >
          {loading && <Spinner />}
          Create Account
        </button>
        <hr />
        <div className="w-100 text-center text-muted">
          Already hav an account? <Link href="/">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
