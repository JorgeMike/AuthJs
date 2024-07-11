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

export default function DestinationFilterMobile() {
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

  return (
    <div
      className="modal fade"
      id="destinationFilterMobile"
      tabIndex={-1}
      aria-labelledby="destinationFilterMobile"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-md-down">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="m-0">Ordena y filtra</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="my-3">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="habitaciones"
                  placeholder="name@example.com"
                  defaultValue={searchParams.get("rooms")?.toString()}
                />
                <label htmlFor="floatingInputGrid">Habitaciones</label>
              </div>
              <div className="row g-2">
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="habitaciones"
                      placeholder="name@example.com"
                      defaultValue={searchParams.get("adults")?.toString()}
                      />
                    <label htmlFor="floatingInputGrid">Adultos</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="habitaciones"
                      placeholder="name@example.com"
                      defaultValue={searchParams.get("children")?.toString()}
                      />
                    <label htmlFor="floatingInputGrid">Niños</label>
                  </div>
                </div>
              </div>
              <p className="m-0 ms-2 mb-1 fw-bold">Precio</p>
              <div className="row g-2">
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="habitaciones"
                      placeholder="name@example.com"
                      defaultValue={1}
                    />
                    <label htmlFor="floatingInputGrid">Min</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="habitaciones"
                      placeholder="name@example.com"
                      defaultValue={1}
                    />
                    <label htmlFor="floatingInputGrid">Max</label>
                  </div>
                </div>
              </div>
              <input
                type="range"
                className="form-range"
                id="customRange1"
              ></input>
              <p className="m-0 ms-2 mb-1 fw-bold">Reputación</p>
              <div className="d-flex gap-2 flex-wrap mb-3">
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
        </div>
      </div>
    </div>
  );
}
