"use client";
import React, { useState } from "react";
import { IChildren } from "../../../types";
import axios from "axios";
import { IUser } from "@/models/User";
import { Session } from "next-auth";

type UserContextType = {
  fetchUser: (session: Session) => void;
};

const UserContext = React.createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default function UserProvider({ children }: IChildren) {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileEdit, setProfileEdit] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    authProvider: "",
  });

  const fetchUser = async (session: Session) => {
    try {
      const response = await axios.get(`/api/user/${session.user?.email}`);

      setProfile(response.data.user);
      setProfileEdit(response.data.user);
    } catch (error: any) {
      console.log(error.response);
      setError(
        error.response
          ? error.response.message
          : "An error occurred, please try again later."
      );
    }
  };

  return (
    <UserContext.Provider value={{ fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
