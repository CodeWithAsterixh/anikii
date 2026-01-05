import React from "react";
import { Header } from "../components/header/header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen overflow-y-auto bg-base-100 text-base-content flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>
      <footer className="py-6 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} Anikii. Built for anime fans.
      </footer>
    </div>
  );
}
