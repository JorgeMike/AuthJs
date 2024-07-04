"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import SearchModal from "./SearchModal";

export default function SearchBar() {
  const [destination, setDestination] = useState<string>("");

  return (
    <>
      <div className="d-flex mx-5 my-4 align-items-center gap-2">
        <div className="border rounded-circle px-2 py-1 pointer">
          <BiSearch />
        </div>
        <div className="form-floating" style={{ flex: "1" }}>
          <input
            type="email"
            className="form-control rounded-5 ps-4"
            id="destination"
            placeholder="Search your next trip"
            data-bs-toggle="modal"
            data-bs-target="#searchModal"
            value={destination}
          />
          <label htmlFor="destination" className="ms-2">
            Search for destinations
          </label>
        </div>
      </div>
      <SearchModal setDestination={setDestination} destination={destination} />
    </>
  );
}
