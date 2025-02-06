import { useEffect, useState } from "react";

const __BREAKPOINT = 498;

export function useIsMobile(MOBILE_BREAKPOINT: number = __BREAKPOINT) {
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const mql = window.matchMedia(`max-width: ${MOBILE_BREAKPOINT - 1}px`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [MOBILE_BREAKPOINT]);

  return !!isMobile;
}
