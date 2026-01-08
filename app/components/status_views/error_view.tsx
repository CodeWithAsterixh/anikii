import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorView({ 
  message = "Something went wrong while loading this content.", 
  onRetry,
  className = ""
}: Readonly<ErrorViewProps>) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-error/5 rounded-box border border-error/20 ${className}`}>
      <AlertCircle className="text-error mb-4" size={48} />
      <h3 className="text-lg font-bold mb-2">Unable to load data</h3>
      <p className="text-sm opacity-70 mb-6 max-w-xs mx-auto">
        {message}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 bg-error text-error-content px-6 py-2 rounded-full font-semibold hover:bg-error/90 transition-colors"
        >
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
