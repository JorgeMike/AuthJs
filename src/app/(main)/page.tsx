import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carousel";
import DestinationsSection from "@/components/Seccions/DestinationsSection";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import { IDestination } from "@/types/IDestination";
import mountains from "@/utils/json/mountains.json";
import beaches from "@/utils/json/beaches.json";
import React from "react";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Page() {
  return (
    <>
      <div className="container">
        <Banner />
        <SearchBar />
        <Carousel />
        <hr style={{ color: "#cecece" }} />
        <DestinationsSection
          data={mountains as IDestination[]}
          title="Mountain Adventures"
          description="Explore breathtaking mountain destinations"
        />
        <hr style={{ color: "#cecece" }} />
        <DestinationsSection
          data={beaches as IDestination[]}
          title="Tropical Beach Escapes"
          description="Discover paradise with our curated selection of stunning beach destinations. Enjoy the sun, sand, and sea at these top-rated coastal getaways."
        />
      </div>
      <SocialMedia />
    </>
  );
}
