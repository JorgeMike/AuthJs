import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/custom.scss";
import Providers from "./Providers";
import MainLayout from "@/components/MainLayout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App Practica",
  description: "Aplicacion de practica para aprender Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="light">
      <body className={inter.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
