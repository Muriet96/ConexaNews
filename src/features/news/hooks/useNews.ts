import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../../../services/news';
import { useDispatch } from 'react-redux';
import { setNews } from '../newsSlice';
import { useEffect } from 'react';
import { Post } from '../types';

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