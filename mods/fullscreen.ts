interface ExtendedScreenOrientation extends ScreenOrientation {
  lock: (orientation: "portrait" | "landscape") => Promise<void>;
}

export function setOrientation(to: "landscape" | "unlock" = "landscape") {
  if (
    typeof window === "undefined" ||
    typeof screen === "undefined" ||
    !screen.orientation
  ) {
    return; // Exit if not in a browser environment or if screen.orientation is unavailable
  }

  const orientation = screen.orientation as ExtendedScreenOrientation;

  try {
    if (to === "unlock" && typeof orientation.unlock === "function") {
      orientation.unlock();
    } else if (to === "landscape" && typeof orientation.lock === "function") {
      orientation.lock("landscape").catch(() => {
        console.warn("Failed to lock orientation to landscape");
      });
    }
  } catch (error) {
    console.error("Error setting orientation:", error);
  }
}
