"use client";

import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/store";
import AutoResetPagesScroll from "../../ui/components/AutoResetScroll/AutoResetScroll";
import NavBar from "../../ui/components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/reducers/themeReducer";
import MainHeader from "@/ui/components/mainHeader/MainHeader";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Initial theme detection based on system preferences
    dispatch(setTheme("auto"));
  }, [dispatch]);

  useEffect(() => {
    // Watch for manual darkMode state changes
    if (mode == "dark") {
      // Check if "dark" class is not already added, then add it
      if (!document.querySelector("html")?.classList.contains("dark")) {
        document.querySelector("html")?.classList.add("dark");
      }
    } else {
      // Remove the "dark" class if it's present
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [mode]);
  return (
    <div className="size-full overflow-y-auto relative isolate flex items-start justify-start gap-2 bg-square-grid dark:bg-square-grid-dark">
      <AutoResetPagesScroll />

      <NavBar />
      <main className="size-full relative z-0 overflow-y-auto flex flex-col gap-2 items-start justify-start">
        <MainHeader />
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  );
}
