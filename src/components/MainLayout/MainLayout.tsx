import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="container-lg">
        <Header />
        <Navbar />
      </div>
      {children}
      <Footer />
    </main>
  );
}
