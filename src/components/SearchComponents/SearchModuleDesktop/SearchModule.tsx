"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";
import { useSearchParams } from "next/navigation";

export default function SearchModule() {
  const searchParams = useSearchParams();
  const [destination, setDestination] = useState<string>("");

  return (
    <>
      <SearchBar
        defaultValue={searchParams.get("destination") || ""}
        modal="searchModal"
      />
      <SearchModal setDestination={setDestination} destination={destination} />
    </>
  );
}
