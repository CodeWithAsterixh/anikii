import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "@/state/provider";
import { ModalProvider } from "@/ui/Modal/Modal";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anikii | Genjitsu wa kantan",
  description:
    "watch your favorite anime on anikii with lesser ads and easy access | Anikii is a free anime streaming website with a large collection of anime shows and movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-base-black bg-base-white`}
      >
        <ReduxProvider>
          <ModalProvider>{children}</ModalProvider>

          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
