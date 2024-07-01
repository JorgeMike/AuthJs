import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";

interface IImageProfile {
  src: string;
  alt: string;
  onEdit?: () => void;
}

export default function ImageProfile({ src, alt, onEdit }: IImageProfile) {

  return (
    <div className="position-relative d-inline-block">
      <img
        src={src || "/profile.png"}
        alt={alt || "Profile image"}
        width={120}
        height={120}
        className="rounded-circle"
      />
      <button
        type="button"
        className="position-absolute d-flex align-items-center justify-content-center btn btn-primary p-1 rounded-circle"
        style={{
          bottom: 0,
          right: 0,
        }}
        onClick={onEdit}
      >
        <MdEdit />
      </button>
    </div>
  );
}
