import Image from "next/image";
import React from "react";

interface CardProps {
  destination: string;
  location: string;
  tripType: string;
  price: number;
  originalPrice: number;
  discount: string;
  perNight: boolean;
  imageUrl: string;
  imageAlt: string;
}

export default function Card({
  destination,
  location,
  tripType,
  price,
  originalPrice,
  discount,
  perNight,
  imageUrl,
  imageAlt,
}: CardProps) {
  return (
    <div className="card-container">
      <div className="position-relative">
        <Image
          className="image"
          alt={imageAlt}
          src={imageUrl}
          width={300}
          height={200}
        />
        <span className="discount-badge text-bg-primary py-1 px-2 rounded smaller position-absolute">
          {discount}
        </span>
      </div>
      <div className="content ps-2 pt-1 my-2 text-start">
        <span className="text-secondary">{tripType}</span>
        <h5>{destination}</h5>
        <h6>{location}</h6>
        <p className="mb-1">
          Desde ${price} <s>${originalPrice}</s>{" "}
          <span className="small">{perNight ? "por noche" : ""}</span>
        </p>
      </div>
    </div>
  );
}
