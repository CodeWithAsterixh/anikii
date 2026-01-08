import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = "No results found", 
  message = "We couldn't find what you were looking for.", 
  className = "",
  icon
}: Readonly<EmptyStateProps>) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center opacity-60 ${className}`}>
      {icon || <SearchX size={64} className="mb-6 opacity-20" />}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm max-w-xs mx-auto">
        {message}
      </p>
    </div>
  );
}
