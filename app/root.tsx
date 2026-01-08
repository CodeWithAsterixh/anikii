import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; media-src 'self' https: blob:; frame-src https:; connect-src 'self' https:;" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error instanceof Error) {
    if (import.meta.env.DEV) {
      details = error.message;
      stack = error.stack;
    } else {
      details = "A technical issue occurred. Our team has been notified.";
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-100 text-base-content">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-9xl font-black text-error/20">{message}</div>
        <h1 className="text-2xl font-bold">{message === "404" ? "Page Not Found" : "Something went wrong"}</h1>
        <p className="text-base-content/60">{details}</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => globalThis.window.location.reload()}
            className="w-full bg-primary text-primary-content py-3 rounded-full font-bold hover:bg-primary/90 transition-all"
          >
            Try Again
          </button>
          <a 
            href="/"
            className="w-full bg-base-200 text-base-content py-3 rounded-full font-bold hover:bg-base-300 transition-all"
          >
            Return Home
          </a>
        </div>

        {stack && (
          <div className="mt-8 text-left">
            <p className="text-xs font-bold opacity-40 uppercase mb-2">Debug Information</p>
            <pre className="bg-base-200 p-4 rounded-lg overflow-x-auto text-[10px] opacity-70">
              <code>{stack}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
