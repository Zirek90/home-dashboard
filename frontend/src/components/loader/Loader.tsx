import "./styles.css";

export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="bouncing-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
