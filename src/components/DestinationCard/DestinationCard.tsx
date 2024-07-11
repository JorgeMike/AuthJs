import React from "react";
import Image from "next/image";
import { FaWifi } from "react-icons/fa6";
import { FaDog, FaStar, FaSwimmingPool } from "react-icons/fa";
import { LuCigarette } from "react-icons/lu";
import Link from "next/link";

export default function DestinationCard() {
  return (
    <div className="d-flex flex-column flex-md-row border rounded-3 overflow-hidden mx-3">
      <div className="d-none d-md-flex">
        <Image
          src={"https://via.placeholder.com/319x200/7096d1/FFFFFF"}
          width={319}
          height={200}
          alt="lorem"
        />
      </div>
      <div className="d-none d-sm-flex d-md-none">
        <Image
          src={"https://via.placeholder.com/680x200/7096d1/FFFFFF"}
          width={680}
          height={200}
          alt="lorem"
        />
      </div>
      <div className="d-sm-none">
        <Image
          src={"https://via.placeholder.com/505x200/7096d1/FFFFFF"}
          width={505}
          height={200}
          alt="lorem"
        />
      </div>
      <div className="d-flex flex-column px-3 py-2 mt-1">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Maldivas</h4>
          <p className="mb-0 text-bg-success px-2 py-1 rounded smaller">
            <b>18%</b> OFF
          </p>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-sm-between mt-3">
          <p className="text-muted smaller d-none d-sm-flex w-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur ullam nesciunt iste repellat dignissimos porro
            deserunt. Beatae.
          </p>
          <div className="d-flex justify-content-start justify-content-sm-end">
            <span>
              <p className="m-0">
                Paquete desde <b>$1,500</b>
              </p>
              <p className="m-0 small text-start text-sm-end">$195 por noche</p>
              <p className="smaller text-muted m-0">
                Impuestos y cargos incluidos
              </p>
            </span>
          </div>
        </div>
        <span style={{ flex: "1" }}></span>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
          <div className="d-flex gap-1">
            <span
              className="text-bg-primary px-2 py-1 rounded"
              title="Wifi disponible"
            >
              <FaWifi />
            </span>
            <span
              className="text-bg-primary px-2 py-1 rounded"
              title="PetFriendly"
            >
              <FaDog />
            </span>
            <span
              className="text-bg-primary px-2 py-1 rounded"
              title="Piscina disponible"
            >
              <FaSwimmingPool />
            </span>
            <span
              className="text-bg-primary px-2 py-1 rounded"
              title="Área de fumadores disponible"
            >
              <LuCigarette />
            </span>
            <span
              className="text-bg-primary px-2 py-1 rounded"
              title="Calificación"
            >
              5 <FaStar />
            </span>
          </div>
          <Link
            href={"/destination/link"}
            className="btn btn-primary px-2 py-1 mt-2 mt-md-0"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
