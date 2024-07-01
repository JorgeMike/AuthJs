"use client";
import React, { Suspense, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { ILogin } from "@/types/IAuth";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import Alert from "@/components/Alerts/Alert";

export default function Page() {
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { status } = useSession();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/d",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigInGoogle = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/d",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigInGitHube = async () => {
    try {
      await signIn("github", {
        callbackUrl: "/d",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Suspense>
        <Alert />
      </Suspense>
      <div>
        <form className="mt-5 border p-3 rounded" onSubmit={handleOnSubmit}>
          <h2 className="text-center">Sign In</h2>
          <hr />
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
          <hr />
          <div className="w-100 text-center text-muted">
            Si aun no tienes cuenta <Link href="/signup">Registrate</Link>
          </div>
        </form>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-100"
          onClick={handleSigInGoogle}
        >
          <FaGoogle /> Sign In with Google
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3 w-100"
          onClick={handleSigInGitHube}
        >
          <FaGithub /> Sign In with GitHub
        </button>
      </div>
      <Suspense>
        {status === "authenticated" && (
          <div className="mt-3">
            You already have an active session.
            <Link href={"/d"}>Would you like to continue with it?</Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
