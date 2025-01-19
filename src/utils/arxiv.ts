import { ArxivPaper, SearchFilters } from '../types/arxiv';

const ARXIV_API_URL = 'https://export.arxiv.org/api/query';

export async function searchArxiv(
  query: string,
  start = 0,
  filters: SearchFilters
): Promise<ArxivPaper[]> {
  let searchQuery = '';
  const searchTerms: string[] = [];

  // Add text search with field-specific filters
  if (query.trim()) {
    const cleanQuery = query.replace(/[^\w\s-]/g, '').trim();
    if (cleanQuery) {
      const fieldQueries: string[] = [];
      
      // Handle field-specific searches
      if (filters.title) fieldQueries.push(`ti:"${cleanQuery}"`);
      if (filters.abstract) fieldQueries.push(`abs:"${cleanQuery}"`);
      if (filters.author) fieldQueries.push(`au:"${cleanQuery}"`);
      if (filters.journalRef) fieldQueries.push(`jr:"${cleanQuery}"`);
      
      // If no specific fields are selected or if it's an author search, use the appropriate field
      if (fieldQueries.length === 0) {
        searchTerms.push(`all:"${cleanQuery}"`);
      } else {
        searchTerms.push(`(${fieldQueries.join(' OR ')})`);
      }
    }
  }

  // Add category filter
  if (filters.category) {
    searchTerms.push(`cat:${filters.category}`);
  }

  // Add date range filters
  if (filters.yearFrom || filters.yearTo) {
    const fromYear = filters.yearFrom ? `${filters.yearFrom}0101` : '19910101';
    const toYear = filters.yearTo ? `${filters.yearTo}1231` : '99991231';
    searchTerms.push(`submittedDate:[${fromYear} TO ${toYear}]`);
  }

  // Combine all search terms
  searchQuery = searchTerms.join(' AND ');
  if (!searchQuery.trim()) {
    searchQuery = 'all:*'; // Default to all papers if no filters
  }

  // Construct the API URL with proper sorting
  let url = `${ARXIV_API_URL}?start=${start}&max_results=10`;
  url += `&search_query=${encodeURIComponent(searchQuery)}`;

  // Add sorting parameters based on the selected sort option
  switch (filters.sortBy) {
    case 'lastUpdated':
      url += '&sortBy=lastUpdatedDate&sortOrder=descending';
      break;
    case 'submitted':
      url += '&sortBy=submittedDate&sortOrder=descending';
      break;
    // For 'relevance', we don't add any sort parameters as we'll sort after fetching
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText);
      throw new Error('Failed to fetch papers');
    }

    const text = await response.text();
    if (!text.trim()) {
      console.error('Empty response received');
      return [];
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      console.error('XML parsing error:', parseError.textContent);
      throw new Error('Failed to parse API response');
    }

    const entries = xmlDoc.getElementsByTagName('entry');
    if (!entries.length) {
      console.log('No entries found in response');
      return [];
    }

    const papers = Array.from(entries).map((entry) => {
      try {
        const authors = Array.from(entry.getElementsByTagName('author')).map(
          (author) => author.getElementsByTagName('name')[0]?.textContent || ''
        );

        const id = entry.getElementsByTagName('id')[0]?.textContent || '';
        const pdfLink = id.replace('abs', 'pdf');
        
        const links = Array.from(entry.getElementsByTagName('link')).map(link => ({
          href: link.getAttribute('href') || '',
          type: link.getAttribute('type') || '',
          rel: link.getAttribute('rel') || ''
        }));

        const doi = links.find(link => link.rel === 'related')?.href || '';

        return {
          id,
          title: entry.getElementsByTagName('title')[0]?.textContent?.trim() || 'Untitled',
          summary: entry.getElementsByTagName('summary')[0]?.textContent?.trim() || '',
          authors: authors.length ? authors : ['Unknown Author'],
          published: entry.getElementsByTagName('published')[0]?.textContent || new Date().toISOString(),
          updated: entry.getElementsByTagName('updated')[0]?.textContent || new Date().toISOString(),
          categories: Array.from(entry.getElementsByTagName('category')).map(
            (category) => category.getAttribute('term') || ''
          ),
          doi,
          primaryCategory: entry.getElementsByTagName('category')[0]?.getAttribute('term') || 'Uncategorized',
          pdfLink,
          journalRef: entry.getElementsByTagName('journal_ref')?.[0]?.textContent || '',
          comments: entry.getElementsByTagName('comment')?.[0]?.textContent || ''
        };
      } catch (err) {
        console.error('Error parsing entry:', err);
        return null;
      }
    }).filter((paper): paper is ArxivPaper => paper !== null);

    return papers;
  } catch (error) {
    console.error('Error fetching papers:', error);
    return [];
  }
}