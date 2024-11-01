export class Fullscreen {
  elem: HTMLDivElement | null = null;
  constructor(element: HTMLDivElement) {
    this.elem = element;
  }
  /* View in fullscreen */
  open() {
    if (this.elem) {
      this.elem.requestFullscreen();
    }
  }

  /* Close fullscreen */
  close() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
export function setOrientation(to: "landscape" | "unlock" = "landscape") {
  try {
    if (screen.orientation) {
      if (to === "unlock") {
        screen.orientation.unlock();
      } else if (to === "landscape" && screen.orientation.lock) {
        screen.orientation.lock("landscape");
      }
    }
  } catch (error) {
    return;
  }
}
