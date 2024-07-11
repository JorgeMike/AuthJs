"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import cancun from "@/utils/json/cancun.json";
import Image from "next/image";

export default function DestinationWithCarousel() {
  return (
    <div className="row">
      <div className="col-md-6">
        <Swiper navigation={true} modules={[Pagination]} spaceBetween={15}>
          {cancun.images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt={`Cancun ${index}`} width={300} height={150}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-md-6">
        <h3 className="mt-3 mb-0">{cancun.title}</h3>
        <p className="m-0">{cancun.location}</p>
        <p className="d-none d-md-block">{cancun.description}</p>
        <p>Paquetes desde $MXN5000</p>
      </div>
    </div>
  );
}
