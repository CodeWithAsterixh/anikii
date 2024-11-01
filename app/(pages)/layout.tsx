"use client";

import React from "react";

import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggler from "@/ui/components/ThemeToggler";
import { setTheme } from "@/state/reducers";
import Header from "@/ui/components/Header";
type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  const { mode } = useSelector(
    (state: RootState) => state.UserPreferences.themeMode
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // Initial theme detection based on system preferences
    dispatch(setTheme("auto")); // Dispatching to Redux or your state manager
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
    <>
      <Header />
      {children}

      <ThemeToggler />
    </>
  );
}

export default Layout;
