import axios from 'axios';
import { Post } from '@features/news/types';
import {API_NEWS_ENDPOINT} from '../constants/api';

/**
 * Fetches a list of news posts from the API endpoint.
 *
 * Makes a GET request to the configured news API endpoint and returns an array of `Post` objects.
 * Ensures that each post has a `content` property; if missing, it defaults to 'No content available'.
 *
 * @returns {Promise<Post[]>} A promise that resolves to an array of news posts.
 * @throws {AxiosError} Throws if the HTTP request fails.
 */
export const fetchNews = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(API_NEWS_ENDPOINT);
  return response.data.map(item => ({
    ...item,
    content: item.content || 'No content available',
  }));
};