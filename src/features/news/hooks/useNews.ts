import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../../../services/news';
import { useDispatch } from 'react-redux';
import { setNews } from '../newsSlice';
import { useEffect } from 'react';
import { Post } from '../types';

/**
 * Custom React hook to fetch and manage news data.
 *
 * This hook uses React Query to asynchronously fetch an array of `Post` objects
 * and dispatches the fetched data to the Redux store using the `setNews` action.
 * It returns the query object from React Query, which includes loading, error,
 * and data states.
 *
 * @returns {UseQueryResult<Post[], Error>} The query object containing the news data,
 * loading state, and error information.
 *
 * @example
 * const newsQuery = useNews();
 * if (newsQuery.isLoading) return <Loading />;
 * if (newsQuery.error) return <Error />;
 * return <NewsList news={newsQuery.data} />;
 */
export const useNews = () => {
  const dispatch = useDispatch();
  const query = useQuery<Post[], Error>({
    queryKey: ['news'],
    queryFn: fetchNews,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setNews(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};