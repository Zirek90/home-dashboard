import axios from "axios";

export function errorHandler(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data?.message ||
        error.response.data?.error || // Sometimes error messages are under `error`
        "An unexpected error occurred"
      );
    }

    return "Network error. Please check your connection.";
  }

  return "An unexpected error occurred";
}
