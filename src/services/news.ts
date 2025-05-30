import axios from 'axios';
import { Post } from '@features/news/types';
import {API_NEWS_ENDPOINT} from '../constants/api';

export const fetchNews = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_NEWS_ENDPOINT);
  return response.data.map(item => ({
    ...item,
    content: item.content || 'No content available',
  }));
};