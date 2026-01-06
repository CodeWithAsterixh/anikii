import { Link } from "react-router";
import { MainLayout } from "../layouts/main_layout";
import type { Route } from "./+types/not_found";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Page Not Found | Anikii" },
    { name: "robots", content: "noindex, follow" },
  ];
};

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-9xl font-black text-primary mb-4">404</h1>
        <p className="text-2xl font-bold mb-8">Oops! Page not found.</p>
        <p className="opacity-60 mb-10 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="bg-primary hover:bg-primary/90 text-primary-content px-8 py-3 rounded-full font-bold transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </MainLayout>
  );
}
