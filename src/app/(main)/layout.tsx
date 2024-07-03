import MainLayout from "@/components/MainLayout/MainLayout";
import React from "react";
import { IChildren } from "../../../types";

export default function layout({ children }: IChildren) {
  return <MainLayout>{children}</MainLayout>;
}
