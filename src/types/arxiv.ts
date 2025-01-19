export interface ArxivPaper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  updated: string;
  categories: string[];
  doi?: string;
  primaryCategory: string;
  pdfLink: string;
  journalRef?: string;
  comments?: string;
  score?: number;
}

export interface SearchFilters {
  category: string;
  dateFrom: string;
  dateTo: string;
  sortBy: "relevance" | "lastUpdated" | "submitted";
  sortOrder: "ascending" | "descending";
  author?: boolean;
  abstract?: boolean;
  title?: boolean;
  journalRef?: boolean;
  yearFrom?: string;
  yearTo?: string;
}

export interface SearchResponse {
  papers: ArxivPaper[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
}

export interface RelatedPaper extends ArxivPaper {
  similarity: number;
}
