"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import AutoSidebarNewPage from "./AutoSidebarNewPage";

const AutoResetPagesScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <AutoSidebarNewPage change={pathname} />;
};

export default AutoResetPagesScroll;
