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
  const [image, setImage] = useState<string | null>(null);
  const [imageProfile, setImageProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IUser | null>(null);
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
    const fetchImage = async (image_name: string) => {
      try {
        const response = await axios.get(
          `/api/user/profile-picture/${image_name}`
        );

        setImageProfile(response.data.image);
      } catch (error: any) {
        console.log(error.response);
        setError(
          error.response
            ? error.response.message
            : "An error occurred, please try again later."
        );
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${session?.user?.email}`);

        setProfile(response.data.user);
        setProfileEdit(response.data.user);

        if (response.data.user.image) {
          fetchImage(response.data.user.image);
        }
      } catch (error: any) {
        console.log(error.response);
        setError(
          error.response
            ? error.response.message
            : "An error occurred, please try again later."
        );
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session?.user?.email]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`/api/user/${session?.user?.email}`, {
        name: profileEdit.name,
        birthdate: profileEdit.birthdate,
        phone: profileEdit.phone,
      });

      setProfile(profileEdit);
      toast.success(res.data.message, {
        style: darkToastStyles,
      });
      setError(null);
    } catch (error: any) {
      console.log(error.response.data);
      setError(
        error.response.data?.message ||
          "An error occurred, please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg, image/jpg";
    input.click();

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          console.log("Base64 image:", base64Image);
          setImage(base64Image);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const handleOnUpdateImage = async () => {
    if (image) {
      setIsLoading(true);
      try {
        const res = await axios.post(`/api/user/profile-picture`, {
          email: session?.user?.email,
          image,
        });
        if (res.status === 200) {
          toast.success(res.data.message, {
            style: darkToastStyles,
          });
          setImageProfile(image);
        }
      } catch (error: any) {
        console.log(error.response);
        toast.error(
          error.response.data?.message ||
            "An error occurred, please try again later.",
          {
            style: darkToastStyles,
          }
        );
      } finally {
        setIsLoading(false);
        setImage(null);
      }
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row gap-3 mx-2 mx-sm-0">
        <div className="col-12 col-md-6 border d-flex flex-column justify-content-center rounded-3 p-2 ">
          <div className="d-flex align-items-center justify-content-center">
            <ImageProfile
              src={image || imageProfile || session?.user?.image || ""}
              alt="Profile Image"
              onEdit={handleOnClick}
            />
          </div>
          <div className="mt-2">
            <label className="form-label mb-1">Email:</label>
            <input
              type="email"
              value={profile?.email}
              className="border p-2 rounded form-control text-center"
              disabled
            />
          </div>
          {image && (
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleOnUpdateImage}
              disabled={isLoading}
            >
              Update Image
            </button>
          )}
        </div>
        <div className="col border rounded-3">
          <div className="my-3">
            <label className="form-label mb-1">Name:</label>
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
            <p className="form-label mb-1">Birthdate:</p>
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
            <p className="form-label mb-1">Phone number:</p>
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
          {(profile?.name !== profileEdit?.name ||
            profile?.birthdate !== profileEdit?.birthdate ||
            profile?.phone !== profileEdit?.phone) && (
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleOnUpdate}
              disabled={isLoading}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
