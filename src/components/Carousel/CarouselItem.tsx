import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
interface CardData {
  title: string;
  location: string;
  image: string;
  rating: number;
}

interface CarouselItemProps {
  data: CardData;
}

export default function CarouselItem({ data }: CarouselItemProps) {
  return (
    <div className="m-1 pointer">
      <Image
        src={data.image}
        alt={data.title}
        className="ci-image"
        width={350}
        height={200}
      />
      <div className="d-flex align-items-center justify-content-between">
        <div className="text-start my-2">
          <h3 className="fs-5 mb-0">{data.title}</h3>
          <p className="mb-0 text-muted small">
            <FaMapMarkerAlt /> {data.location}
          </p>
        </div>
        <div className="ci-card-rating text-bg-primary px-2 py-1 rounded-4 d-flex gap-2 align-items-center justify-content-center">
          <span>
            <FaStar />
          </span>
          <span>{data.rating}</span>
        </div>
      </div>
    </div>
  );
}
