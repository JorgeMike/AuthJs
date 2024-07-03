import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function SocialMedia() {
  return (
    <div className="social-media-container d-flex gap-3">
      <div className="border rounded-circle d-flex align-items-center justify-content-center p-2 hover-facebook">
        <FaFacebook />
      </div>
      <div className="border rounded-circle d-flex align-items-center justify-content-center p-2 hover-instagram">
        <FaInstagram />
      </div>
      <div className="border rounded-circle d-flex align-items-center justify-content-center p-2 hover-twitter">
        <FaTwitter />
      </div>
      <div className="border rounded-circle d-flex align-items-center justify-content-center p-2 hover-whatsapp">
        <FaWhatsapp />
      </div>
    </div>
  );
}
