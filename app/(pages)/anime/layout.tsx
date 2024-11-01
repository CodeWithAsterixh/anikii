"use client";

import React, { Suspense } from "react";

import BreadCrumbed from "@/ui/components/Breadcrumbed";
type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <main className=" w-full h-fit flex items-start justify-start flex-col pb-32">
      <BreadCrumbed />
      <Suspense>{children}</Suspense>
    </main>
  );
}

export default Layout;
