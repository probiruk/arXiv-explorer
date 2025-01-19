import React from "react";
import { Search } from "lucide-react";
import { SearchFilters } from "../types/arxiv";
import { SearchFiltersPanel } from "./SearchFilters";

interface SearchBarProps {
  query: string;
  filters: SearchFilters;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onFilterChange: (key: keyof SearchFilters, value: string | boolean) => void;
  onSearch: (e: React.FormEvent) => void;
}

export function SearchBar({
  query,
  filters,
  isLoading,
  onQueryChange,
  onFilterChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div className="mb-8 relative z-50">
      <form onSubmit={onSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search papers..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <SearchFiltersPanel
              filters={filters}
              onFilterChange={onFilterChange}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
