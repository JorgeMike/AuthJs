"use server";

import { signIn } from "../../auth";

export const log = async (formData: FormData) => {
  try {
    const res = await signIn("credentials", formData);
    console.log(res)
    return "hola";
  } catch (error) {
    console.log("errorerror", error);
    return "HOLA";
  }
};
