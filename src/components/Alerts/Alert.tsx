import { useSearchParams } from "next/navigation";
import React from "react";

export default function Alert() {
  const path = useSearchParams();

  return (
    path.get("error") && (
      <div className="alert alert-danger mt-5" role="alert">
        <h5 className="alert-heading">¡Oops!</h5>
        <p className="mb-0">Algo salió mal. Por favor, inténtalo de nuevo.</p>
      </div>
    )
  );
}
