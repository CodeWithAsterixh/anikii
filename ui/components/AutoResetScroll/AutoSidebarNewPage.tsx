"use client";

import { setSideBarSize } from "@/store/reducers/sideBarReducer";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function AutoSidebarNewPage({ change }: { change: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => setScreenWidth(window.innerWidth);

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Set initial screen width when the component mounts
      setScreenWidth(window.innerWidth);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (screenWidth < 500) {
      dispatch(setSideBarSize("small"));
    }
  }, [dispatch, screenWidth, change]);

  return null;
}

export default AutoSidebarNewPage;
