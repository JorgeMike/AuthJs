import Banner from "@/components/Banner/Banner";
import Carousel from "@/components/Carousel/Carousel";
import DestinationsSection from "@/components/Sections/DestinationsSection";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import { IDestination } from "@/types/IDestination";
import mountains from "@/utils/json/mountains.json";
import beaches from "@/utils/json/beaches.json";
import React from "react";
import DestinationWithCarousel from "@/components/Sections/DestinationWithCarousel";
import SearchModule from "@/components/SearchComponents/SearchModule/SearchModule";

export default function Page() {
  return (
    <>
      <div className="container">
        <Banner />
        <SearchModule />
        <Carousel />
        <hr style={{ color: "#cecece" }} />
        <DestinationsSection
          data={mountains as IDestination[]}
          title="Mountain Adventures"
          description="Explore breathtaking mountain destinations"
        />
        <hr style={{ color: "#cecece" }} />
        <DestinationWithCarousel />
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
