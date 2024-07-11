"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const options1 = [
  { id: "actividades", label: "Actividades", checked: false },
  { id: "alojamiento", label: "Alojamiento", checked: true },
  { id: "transporte", label: "Transporte", checked: true },
  { id: "paquetes", label: "Paquetes", checked: true },
];

const options2 = [
  { id: "internet", label: "Acceso a internet", checked: false },
  { id: "aire", label: "Aire acondicionado", checked: true },
  { id: "elevador", label: "Elevador", checked: true },
  {
    id: "discapacitados",
    label: "Para personas discapacitadas",
    checked: true,
  },
];

export default function DestinationFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleStarClick = (star: string) => {
    const params = new URLSearchParams(searchParams);
    const stars = params.getAll("star");

    if (stars.includes(star)) {
      params.delete("star", star);
    } else {
      params.append("star", star);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (/^\d*$/.test(value)) {
      if (value === "") {
        params.delete(id);
      } else {
        params.set(id, value);
      }
    } // Permite solo números enteros

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {" "}
      <form>
        <h4>Filtros</h4>
        <div className="mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="rooms"
              placeholder="No. de habitaciones"
              defaultValue={searchParams.get("rooms")?.toString()}
              onChange={handleOnChange}
              maxLength={2}
            />
            <label htmlFor="floatingInput">Habitaciones</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="adults"
              placeholder="No. de habitaciones"
              defaultValue={searchParams.get("adults")?.toString()}
              onChange={handleOnChange}
              maxLength={2}
            />
            <label htmlFor="floatingInput">Adultos</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="children"
              placeholder="No. de habitaciones"
              defaultValue={searchParams.get("children")?.toString()}
              onChange={handleOnChange}
              maxLength={2}
            />
            <label htmlFor="floatingInput">Niños</label>
          </div>
        </div>
        <div className="mb-3">
          <p className="m-0 ms-2 fw-bold">Precio</p>
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="min"
                  defaultValue={searchParams.get("min")?.toString()}
                  onChange={handleOnChange}
                  maxLength={4}
                />
                <label htmlFor="minimo">Minimo</label>
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="max"
                  defaultValue={searchParams.get("max")?.toString()}
                  onChange={handleOnChange}
                  maxLength={4}
                />
                <label htmlFor="maximo">Maximo</label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <p className="m-0 ms-2 fw-bold">Reputación</p>
          <div className="d-flex gap-2 flex-wrap">
            {["1", "2", "3", "4", "5"].map((star) => (
              <div
                key={star}
                className={`d-flex align-items-center jutify-content-center pointer border rounded py-1 px-2 ${
                  searchParams.getAll("star").includes(star)
                    ? "bg-primary text-white border-primary"
                    : ""
                }`}
                onClick={() => handleStarClick(star)}
              >
                {star}
                <span>★</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <p className="m-0 ms-2 fw-bold">Que estas buscando?</p>
          {options1.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheck${option.id}`}
                defaultChecked={option.checked}
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheck${option.id}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <p className="m-0 ms-2 fw-bold">Facilidades de acceso</p>
          {options2.map((option) => (
            <div className="form-check" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheck${option.id}`}
                defaultChecked={option.checked}
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheck${option.id}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
