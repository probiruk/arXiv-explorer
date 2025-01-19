import { BookOpen, Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: "light" | "dark";
  onReset: () => void;
  onToggleTheme: () => void;
}

export function Header({ theme, onReset, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[9999] backdrop-blur-sm bg-white/80 dark:bg-black/80 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <button
            onClick={onReset}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="h-6 w-6 text-blue-500" />
            <h1 className="text-xl font-medium text-black dark:text-white">
              arXiv Explorer
            </h1>
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
