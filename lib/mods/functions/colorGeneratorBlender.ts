type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

/**
 * Converts a hex color string to an RGB object.
 * @param hex - A hex color string (e.g. "#1a2b3c" or "1a2b3c").
 * @returns An RGB object.
 */
function hexToRgb(hex: string): RGB {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(ch => ch + ch).join('');
  }
  const intVal = parseInt(hex, 16);
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255
  };
}

/**
 * Converts an RGB object to HSL.
 * @param rgb - An RGB object.
 * @returns An HSL object.
 */
function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h: number = 0,
    s: number = 0;

    const l: number = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  return { h, s: s * 100, l: l * 100 };
}

/**
 * Converts an HSL color to a hex string.
 * @param h - Hue in degrees [0,360)
 * @param s - Saturation in percent [0,100]
 * @param l - Lightness in percent [0,100]
 * @returns Hex color string (e.g. "#1a2b3c").
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r1 = 0, g1 = 0, b1 = 0;

  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Computes the relative luminance of an RGB color.
 * @param rgb - An RGB object.
 * @returns The relative luminance.
 */
function getLuminance({ r, g, b }: RGB): number {
  const srgb = [r, g, b].map(v => v / 255).map(v =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

/**
 * Returns the contrast ratio between two hex colors.
 * @param hex1 - First hex color.
 * @param hex2 - Second hex color.
 * @returns The contrast ratio.
 */
function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

/**
 * Generates a random color that blends with and contrasts against the given base color.
 * @param baseHex - The base color in hex format.
 * @returns A new hex color string.
 */
function randomBlendedColor(baseHex: string): string {
  const baseRgb = hexToRgb(baseHex);
  const baseHsl = rgbToHsl(baseRgb);

  const newHue = (baseHsl.h + (Math.random() * 60 - 30) + 360) % 360;
  let newSaturation = baseHsl.s + (Math.random() * 20 - 10);
  newSaturation = Math.max(20, Math.min(100, newSaturation));

  const baseLuminance = getLuminance(baseRgb);
  let newLightness;
  if (baseLuminance > 0.5) {
    newLightness = Math.random() * 40;
  } else {
    newLightness = 60 + Math.random() * 40;
  }

  return hslToHex(newHue, newSaturation, newLightness);
}

/**
 * Generates an array of random colors that blend and contrast well with a given base color.
 * Ensures a WCAG contrast ratio of ≥ 4.5.
 *
 * @param colorBlend - The base color (in hex, e.g. "#abcdef") used for blending/contrast.
 * @param length - The number of colors to generate.
 * @returns Array of hex color strings.
 */
export function generateContrastColors(colorBlend: string, length: number): string[] {
  const result: string[] = [];
  let attempts = 0;
  const maxAttempts = length * 50;

  while (result.length < length && attempts < maxAttempts) {
    const candidate = randomBlendedColor(colorBlend);
    if (getContrastRatio(colorBlend, candidate) >= 4.5) {
      result.push(candidate);
    }
    attempts++;
  }

  if (result.length < length) {
    console.warn("Could not generate enough contrasting colors; returning what was generated.");
  }

  return result;
}

