/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "via.placeholder.com",
      }
    ],
  },
  env: {
    IMAGES_SOURCEURL: process.env.IMAGES_SOURCEURL,
  },
};

export default nextConfig;
