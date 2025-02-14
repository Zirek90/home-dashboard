import { FiArrowDownCircle } from "react-icons/fi";

export function DropzoneInstructions() {
  return (
    <>
      <FiArrowDownCircle size={40} className="text-gray-600 dark:text-gray-300" />
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Max 1 GB</p>
    </>
  );
}
