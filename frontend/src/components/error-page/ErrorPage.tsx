import { useNavigate } from "@tanstack/react-router";
import { FiAlertCircle } from "react-icons/fi";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorPage(props: ErrorPageProps) {
  const { message, onRetry } = props;
  const navigate = useNavigate();

  const handleRetry = () => {
    onRetry?.();
    navigate({ to: window.location.pathname }); // Reload existing page
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center py-8">
      <FiAlertCircle className="text-red-600 dark:text-red-400 w-16 h-16" />
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {message || "An unexpected error occurred. Please try again."}
      </h2>
      {onRetry && (
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300"
        >
          Retry
        </button>
      )}
    </div>
  );
}
