"use client";
import ImageProfile from "@/components/User/ImageProfile";
import { IUser } from "@/models/User";
import { darkToastStyles } from "@/styles/toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileEdit, setProfileEdit] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    authProvider: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${session?.user?.email}`);
        if (response.data.error) {
          setError(response.data.message);
          return;
        }
        setProfile(response.data.user);
        setProfileEdit(response.data.user);
      } catch (error: any) {
        console.log(error.response);
        if (error.response) {
          setError(error.response.message);
        }
        setError("Ha ocurrido un error, intenta de nuevo más tarde.");
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnUpdate = async () => {
    console.log("Update profile", profileEdit);
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/user/${session?.user?.email}`, {
        name: profileEdit.name,
        birthdate: profileEdit.birthdate,
        phone: profileEdit.phone,
      });
      if (res.status === 200) {
        setProfile(profileEdit);
        toast.success("Profile updated successfully", {
          style: darkToastStyles,
        });
        setError(null);
      }
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.error) {
        setError(error.response.data.message);
      } else {
        setError("Ha ocurrido un error, intenta de nuevo más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gap-3 mx-2 mx-sm-0">
        <div className="col-12 col-md-6 border d-flex flex-column justify-content-center rounded-4 p-2 ">
          <div className="d-flex align-items-center justify-content-center">
            <ImageProfile
              src={profile?.image || session?.user?.image || ""}
              alt="Profile Image"
            />
          </div>
          <div className="mt-2">
            <p className="text-muted mb-1">Email:</p>
            <input
              type="email"
              value={profile?.email}
              className="border p-2 rounded form-control text-center"
              disabled
            />
          </div>
        </div>
        <div className="col border rounded-4">
          <div className="my-3">
            <p className="text-muted mb-1">Name:</p>
            <input
              type="text"
              name="name"
              value={profileEdit?.name}
              className="border p-2 rounded form-control"
              onChange={handleOnChange}
              disabled={isLoading}
            />
          </div>
          <div className="my-3">
            <p className="text-muted mb-1">Birthdate:</p>
            <input
              type="date"
              name="birthdate"
              value={profileEdit?.birthdate}
              className="border p-2 rounded form-control"
              onChange={handleOnChange}
              disabled={isLoading}
            />
          </div>
          <div className="my-3">
            <p className="text-muted mb-1">Phone number:</p>
            <input
              type="tel"
              name="phone"
              value={profileEdit?.phone}
              className="border p-2 rounded form-control"
              placeholder="Enter your phone number"
              onChange={handleOnChange}
              maxLength={10}
              pattern="/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/"
              disabled={isLoading}
            />
          </div>
          {profile?.name !== profileEdit?.name ||
          profile?.birthdate !== profileEdit?.birthdate ||
          profile?.phone !== profileEdit?.phone ? (
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleOnUpdate}
              disabled={isLoading}
            >
              Update
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
