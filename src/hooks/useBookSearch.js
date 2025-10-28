import { useState, useEffect, useCallback } from 'react';
import { searchBooks } from '../services/openLibraryApi';

export const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const search = useCallback(async (query, options = {}) => {
    if (!query.trim()) {
      setBooks([]);
      setHasSearched(false);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchBooks(query, {
        ...options,
        offset: currentPage * (options.limit || 20)
      });

      if (currentPage === 0) {
        setBooks(data.docs || []);
      } else {
        setBooks(prev => [...prev, ...(data.docs || [])]);
      }
      
      setTotalResults(data.numFound || 0);
    } catch (err) {
      setError(err.message);
      setBooks([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasSearched) {
      setCurrentPage(prev => prev + 1);
    }
  }, [loading, hasSearched]);

  const resetSearch = useCallback(() => {
    setBooks([]);
    setError(null);
    setHasSearched(false);
    setTotalResults(0);
    setCurrentPage(0);
  }, []);

  useEffect(() => {
    if (currentPage > 0) {
      // Trigger search when page changes (for pagination)
      const lastQuery = sessionStorage.getItem('lastSearchQuery');
      if (lastQuery) {
        search(lastQuery, { offset: currentPage * 20 });
      }
    }
  }, [currentPage, search]);

  return {
    books,
    loading,
    error,
    hasSearched,
    totalResults,
    search,
    loadMore,
    resetSearch,
    canLoadMore: books.length < totalResults && !loading
  };
};
