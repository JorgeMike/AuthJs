"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";

interface ISearchBarProps {
  defaultValue?: string;
  modal?: string;
}

export default function SearchBar({ defaultValue, modal }: ISearchBarProps) {
  return (
    <>
      <div className="d-flex mx-md-5 my-4 align-items-center gap-2">
        <div className="border rounded-circle px-2 py-1 pointer">
          <BiSearch />
        </div>
        <div className="form-floating" style={{ flex: "1" }}>
          <input
            type="email"
            className="form-control rounded-5 ps-4"
            placeholder="Search your next trip"
            data-bs-toggle="modal"
            data-bs-target={`#${modal}`}
            defaultValue={defaultValue}
          />
          <label htmlFor="destination" className="ms-2">
            Search for destinations
          </label>
        </div>
      </div>
    </>
  );
}
