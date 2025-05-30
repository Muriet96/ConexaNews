import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { useNews } from '../useNews';
import { useDispatch } from 'react-redux';
import * as reactQuery from '@tanstack/react-query';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('../../../../services/news', () => ({
  fetchNews: jest.fn(),
}));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('useNews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('despacha setNews cuando hay datos', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    const mockData = [
      { id: 1, title: 'Test', content: 'Content', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
    ];
    (reactQuery.useQuery as jest.Mock).mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
    }));

    renderHook(() => useNews());

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.anything());
    });
  });

  it('no despacha setNews si no hay datos', async () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    (reactQuery.useQuery as jest.Mock).mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: null,
    }));

    renderHook(() => useNews());

    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});