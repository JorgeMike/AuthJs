import React from "react";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="container">
        <Header />
        <Navbar />
      </div>
      {children}
    </main>
  );
}
