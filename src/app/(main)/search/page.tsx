"use client";
import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/date.css";
import SearchModule from "@/components/SearchComponents/SearchModuleDesktop/SearchModule";
import { IoOptions } from "react-icons/io5";
import DestinationFilter from "@/components/SearchComponents/DestinationFilter/DestinationFilter";
import { IoAirplane } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DestinationCard from "@/components/DestinationCard/DestinationCard";
import DatePicker from "@/components/SearchComponents/DatePicker/DatePicker";
import DestinationFilterMobile from "@/components/SearchComponents/DestinationFilterMobile/DestinationFilterMobile";

export default function Page() {
  const session = useSession();
  return (
    <div className="container-fluid container-lg">
      <SearchModule />
      <DestinationFilterMobile />
      <a
        className="border p-1 rounded mx-md-5 text-muted d-flex align-items-center justify-content-center gap-3 d-lg-none text-decoration-none pointer"
        data-bs-toggle="modal"
        data-bs-target={`#destinationFilterMobile`}
      >
        <IoOptions className="text-primary" /> Filtros y ordenamientos
      </a>
      <DatePicker />
      <div className="row">
        <div className="col-2 d-none d-lg-block py-2">
          <DestinationFilter />
        </div>
        <div className="col-lg-10 py-2">
          {session.status === "unauthenticated" && (
            <div
              className="
            d-flex
            flex-column
            flex-sm-row
            justify-content-between
            align-items-center
            bg-primary
            rounded
            px-5 py-2 mb-3"
            >
              <p className="m-0 p-2 fs-5 text-white d-flex align-items-center gap-3">
                <IoAirplane className="d-none d-md-flex" /> ¡Inicia sesión para
                disfrutar de nuestros mejores precios siempre!
              </p>
              <Link
                href="/signin"
                className="text-decoration-none btn btn-light"
              >
                Log In
              </Link>
            </div>
          )}
          <DestinationCard />
        </div>
      </div>
    </div>
  );
}
