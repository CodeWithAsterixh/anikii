import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home route
  index("routes/home.tsx"),
  
  // Search route
  route("search", "routes/search.tsx"),
  
  // Anime detail route
  route("anime/:id", "routes/anime_detail.tsx"),
  
  // Watch route
  route("watch/:id/:ep", "routes/watch.tsx"),
  
  // 404 Not Found route - this should be the last route
  route("*", "routes/not_found.tsx"),
] satisfies RouteConfig;
