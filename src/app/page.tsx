"use client";
import React, { useState } from "react";
import { signIn } from "../../auth";
import { log } from "@/lib/log";

export default function Page() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const res = await log(formData);
    console.log(res)
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <form
        className="mt-5 border p-3 rounded"
        action={(formData) => handleSubmit(formData)}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
