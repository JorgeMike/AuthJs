"use client";
import React, { useRef } from "react";
import "@/styles/carousel.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import data from "@/utils/json/bestSellers.json";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import CarouselItem from "./CarouselItem";

export default function Carousel() {
  const swiperRef = useRef<SwiperCore>();

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="c-container">
          <h2 className="c-title">Our Best Sellers</h2>
          <div className="text-muted">
            <p>
              The most popular destinations for our customers. Find out what
            </p>
          </div>
          <div className="d-flex gap-3 text-white justify-content-center">
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center p-2 pointer"
              onClick={handlePrev}
            >
              <FaAngleLeft />
            </div>
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center p-2 pointer"
              onClick={handleNext}
            >
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-9 mt-3 mt-lg-0">
        <Swiper
          watchSlidesProgress={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <CarouselItem data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
