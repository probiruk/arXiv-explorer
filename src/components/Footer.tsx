import { Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-6 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400">Built by</span>
          <a
            href="https://twitter.com/imbiruk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>@imbiruk</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
