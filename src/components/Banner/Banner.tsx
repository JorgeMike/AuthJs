"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoAirplane } from "react-icons/io5";

export default function Banner() {
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div
        className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('https://via.placeholder.com')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="col-lg-6 px-0 text-white">
          <h1 className="display-4 fst-italic title">
            The trip of your dreams is waiting for you.
          </h1>
          <p className="lead my-3">
            Discover your perfect destination with our AI-powered recommendation
            tool. Answer a few questions and let us find the ideal trip for you.
          </p>
          <p
            className="lead mb-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Link href="/signin" className="text-white fw-bold">
              Get started
              <span className={`icon ms-2 ${hover ? "show" : ""}`}>
                <IoAirplane />
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
