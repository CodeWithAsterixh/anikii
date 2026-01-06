export const loader = () => {
  const robots = `
User-agent: *
Allow: /
Sitemap: https://anikii.com/sitemap.xml
`.trim();

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
