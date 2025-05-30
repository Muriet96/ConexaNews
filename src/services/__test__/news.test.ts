import axios from 'axios';
import { fetchNews } from '../news';
import { API_NEWS_ENDPOINT } from '../../constants/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchNews', () => {
  it('should fetch news from API and return data with content fallback', async () => {
    const mockNews = [
      { id: 1, title: 'Test', content: '', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockNews });

    const result = await fetchNews();
    expect(mockedAxios.get).toHaveBeenCalledWith(API_NEWS_ENDPOINT);
    expect(result[0].content).toBe('No content available');
  });

  it('should keep content if present', async () => {
    const mockNews = [
      { id: 2, title: 'Test 2', content: 'Some content', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockNews });

    const result = await fetchNews();
    expect(result[0].content).toBe('Some content');
  });
});