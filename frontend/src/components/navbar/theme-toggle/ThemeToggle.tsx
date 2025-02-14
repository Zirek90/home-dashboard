import { useTheme } from "@src/providers";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="ml-4 p-2 rounded-full border border-gray-300 dark:border-gray-700">
      {theme === "light" ? "🌙 Dark" : "🌞 Light"}
    </button>
  );
}
