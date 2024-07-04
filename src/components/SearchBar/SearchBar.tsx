import React from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  return (
    <div className="d-flex mx-5 my-4 align-items-center gap-2">
      <div className="border rounded-circle px-2 py-1 pointer">
        <BiSearch />
      </div>
      <div className="form-floating" style={{ flex: "1" }}>
        <input
          type="email"
          className="form-control rounded-5 ps-4"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput" className="ms-2">
            Search for destinations
        </label>
      </div>
    </div>
  );
}
