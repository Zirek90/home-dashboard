import React from "react";

interface ButtonProps {
  pending?: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export function Button(props: ButtonProps) {
  const { pending, text, type = "button", onClick, className } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={pending}
      className={`w-full py-2 px-4 rounded text-white ${
        pending
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
      } ${className}`}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10a10 10 0 004 7.92V12z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        text
      )}
    </button>
  );
}
