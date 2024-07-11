"use client";
import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import Card from "./Card";
import "@/styles/sections.css";
import { IDestination } from "@/types/IDestination";

interface SeccionProps {
  title: string;
  description: string;
  data: IDestination[];
}

export default function DestinationsSection({
  title,
  description,
  data,
}: SeccionProps) {
  const swiperRef = useRef<SwiperCore>();

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="my-3">
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="carousel-container position-relative">
        <div
          className="carousel-button prev-button rounded-circle bg-primary d-flex align-items-center justify-content-center p-2 pointer text-white"
          onClick={handlePrev}
        >
          <FaAngleLeft />
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          className="text-black"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 60,
            },
          }}
          centerInsufficientSlides={true}
          loop={true}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                destination={item.destination}
                location={item.location}
                tripType={item.tripType}
                price={item.price}
                originalPrice={item.originalPrice}
                discount={item.discount}
                perNight={item.perNight}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="carousel-button next-button rounded-circle bg-primary d-flex align-items-center justify-content-center p-2 pointer text-white"
          onClick={handleNext}
        >
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
}
