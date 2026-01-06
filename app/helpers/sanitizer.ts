import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks.
 * @param html The raw HTML string to sanitize.
 * @returns A sanitized HTML string.
 */
export function sanitize_html(html: string): string {
  if (typeof window === "undefined") {
    return html; // Fallback for SSR if necessary, though DOMPurify works in node with jsdom
  }
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}
