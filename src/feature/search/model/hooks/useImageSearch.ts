import { useCallback, useEffect, useState } from 'react';
import { UnsplashAPI } from '../api';
import { SCROLL_THRESHOLD } from '../constants';
import type { UnsplashImage } from '../types/types';
import { filterDuplicateImages } from '../utils/imageUtils';
import { isValidQuery, sanitizeQuery } from '../utils/validation';

interface UseImageSearchReturn {
  images: UnsplashImage[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  totalResults: number;
  hasSearched: boolean;
  searchImages: (query: string) => void;
  loadMore: () => void;
  clearError: () => void;
}

export const useImageSearch = (): UseImageSearchReturn => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const searchImages = useCallback(
    async (query: string, pageNum: number = 1, append: boolean = false) => {
      const sanitizedQuery = sanitizeQuery(query);
      if (!isValidQuery(sanitizedQuery)) return;

      setLoading(true);
      setError('');

      try {
        const data = await UnsplashAPI.searchImages(sanitizedQuery, pageNum);

        if (append) {
          setImages((prev) => {
            const newImages = filterDuplicateImages(prev, data.results);
            return [...prev, ...newImages];
          });
        } else {
          setImages(data.results);
          setTotalResults(data.total);
        }

        setHasMore(pageNum < data.total_pages);
        setCurrentQuery(sanitizedQuery);
      } catch (err) {
        setError(
          'Произошла ошибка при загрузке изображений. Проверьте API ключ.'
        );
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      const sanitizedQuery = sanitizeQuery(query);
      if (!isValidQuery(sanitizedQuery)) return;

      setPage(1);
      setImages([]);
      setHasMore(true);
      setHasSearched(true);
      void searchImages(sanitizedQuery, 1);
    },
    [searchImages]
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore && currentQuery) {
      const nextPage = page + 1;
      setPage(nextPage);
      void searchImages(currentQuery, nextPage, true);
    }
  }, [loading, hasMore, currentQuery, page, searchImages]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - SCROLL_THRESHOLD
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return {
    images,
    loading,
    error,
    hasMore,
    totalResults,
    hasSearched,
    searchImages: handleSearch,
    loadMore,
    clearError
  };
};
