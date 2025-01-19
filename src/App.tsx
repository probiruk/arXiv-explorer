import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { searchArxiv } from "./utils/arxiv";
import { rankPapersByRelevance } from "./utils/search";
import { ArxivPaper, SearchFilters } from "./types/arxiv";
import { PDFViewer } from "./components/PDFViewer";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { PaperList } from "./components/PaperList";
import { ModalStack } from "./components/ModalStack";
import { Footer } from "./components/Footer";

interface ModalStackItem {
  type: "paper" | "author";
  data: ArxivPaper | string;
  zIndex: number;
}

const defaultFilters: SearchFilters = {
  category: "",
  dateFrom: "",
  dateTo: "",
  sortBy: "relevance",
  sortOrder: "descending",
  abstract: true,
  title: true,
  author: false,
  journalRef: false,
};

function App() {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState<(ArxivPaper & { score?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [modalStack, setModalStack] = useState<ModalStackItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const baseZIndex = 50;

  const resetState = () => {
    setQuery("");
    setPapers([]);
    setIsLoading(false);
    setIsLoadingMore(false);
    setError(null);
    setPage(0);
    setHasMore(true);
    setPdfUrl(null);
    setModalStack([]);
    setHasSearched(false);
    setFilters(defaultFilters);
  };

  const loadMore = async () => {
    if (isLoadingMore || !hasMore || !query.trim()) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const results = await searchArxiv(query, nextPage * 10, filters);
      const rankedResults = rankPapersByRelevance(results, query);
      setPapers((prev) => [...prev, ...rankedResults]);
      setPage(nextPage);
      setHasMore(results.length === 10);
    } catch (err) {
      console.error("Error loading more papers:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && !filters.category) return;

    setIsLoading(true);
    setError(null);
    setPapers([]);
    setPage(0);
    setHasMore(true);
    setHasSearched(true);

    try {
      const results = await searchArxiv(query, 0, filters);
      const rankedResults = rankPapersByRelevance(results, query);
      setPapers(rankedResults);
      setHasMore(results.length === 10);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to fetch papers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    key: keyof SearchFilters,
    value: string | boolean
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const pushModal = (type: "paper" | "author", data: ArxivPaper | string) => {
    setModalStack((prev) => [
      ...prev,
      {
        type,
        data,
        zIndex: baseZIndex + (prev.length + 1) * 10,
      },
    ]);
  };

  const popModal = (index: number) => {
    setModalStack((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header theme={theme} onReset={resetState} onToggleTheme={toggleTheme} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">
              Explore Scientific Research
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Search through millions of scholarly articles from arXiv
            </p>
          </div>

          <SearchBar
            query={query}
            filters={filters}
            isLoading={isLoading}
            onQueryChange={setQuery}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />

          {isLoading && papers.length === 0 && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                Searching papers...
              </span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {!isLoading && !error && papers.length > 0 && (
            <PaperList
              title="Search Results"
              papers={papers}
              hasMore={hasMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={loadMore}
              onViewPDF={setPdfUrl}
              onPaperClick={(paper) => pushModal("paper", paper)}
            />
          )}

          {!isLoading && !error && papers.length === 0 && hasSearched && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No papers found. Try adjusting your search terms.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <ModalStack
        modalStack={modalStack}
        papers={papers}
        onClose={popModal}
        onViewPDF={setPdfUrl}
        onPaperClick={(paper) => pushModal("paper", paper)}
        onAuthorClick={(author) => pushModal("author", author)}
      />

      {pdfUrl && <PDFViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl(null)} />}
    </div>
  );
}

export default App;
