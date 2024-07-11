"use client";
import SearchBar from "@/components/SearchComponents/SearchModuleDesktop/SearchBar";
import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/date.css";

export default function DatePicker() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // Definir las fechas mínimas y máximas
  const minDate = new Date(); // Fecha actual
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2); // Fecha actual + 2 años

  return (
    <div>
      <div className="d-md-none d-flex justify-content-center align-items-center mt-4">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      {/* Calendario para tamaños md y mayores */}
      <div className="d-none d-md-flex justify-content-center align-items-center mt-4">
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </div>
  );
}
