"use client";
import React, { Dispatch, SetStateAction } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import capitals from "@/utils/json/capitals.json";

interface ISearchModalProps {
  setDestination: Dispatch<SetStateAction<string>>;
  destination: string;
}

export default function SearchModal({
  setDestination,
  destination,
}: ISearchModalProps) {
  function handleSearch(term: string) {
    console.log(term);
    setDestination(term);
  }

  return (
    <div
      className="modal fade"
      id="searchModal"
      tabIndex={-1}
      aria-labelledby="searchModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex align-items-center gap-2">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search your destination"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                defaultValue={destination}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr style={{ color: "#9B9B9B" }} className="mb-2" />
            <ul className="list-unstyled mb-0">
              {capitals.map((capital) => (
                <li
                  key={capital.city}
                  className=" my-1 px-2 py-1 d-flex align-items-center gap-3 hover-secondary rounded"
                >
                  <FaMapMarkerAlt />
                  <div className="d-flex flex-column">
                    <p className="mb-0 fs-5 fw-bold">{capital.city}</p>
                    <small>{capital.country}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
