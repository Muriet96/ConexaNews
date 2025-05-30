jest.mock('react-redux', () => {
  const Actual = jest.requireActual('react-redux');
  return {
    ...Actual,
    useSelector: jest.fn((selector) => selector({ news: { favorites: [1] } })),
    useDispatch: () => jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('../hooks/useNews');

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';
import { useNews } from '../hooks/useNews';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );

const navigation = { navigate: jest.fn() };

describe('NewsListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the news list and search bar', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: 'Noticia Uno', content: 'Contenido uno', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' },
        { id: 2, title: 'Noticia Dos', content: 'Contenido dos', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );
    expect(getByPlaceholderText(/search/i)).toBeTruthy();
    expect(getByText('Noticia Uno')).toBeTruthy();
    expect(getByText('Noticia Dos')).toBeTruthy();
  });

  it('filters news by search', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: 'Noticia Uno', content: 'Contenido uno', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' },
        { id: 2, title: 'Noticia Dos', content: 'Contenido dos', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByPlaceholderText, queryByText } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );
    const searchInput = getByPlaceholderText(/search/i);
    fireEvent.changeText(searchInput, 'Dos');
    expect(queryByText('Noticia Uno')).toBeNull();
    expect(queryByText('Noticia Dos')).toBeTruthy();
  });

  it('allows toggling favorites', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: 'Noticia Uno', content: 'Contenido uno', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' },
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );
    const favButton = getByTestId('favorites-toggle');
    fireEvent.press(favButton);
    expect(favButton).toBeTruthy();
  });

  it('shows loading indicator if isLoading is true', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows error message if error exists', () => {
    const refetchMock = jest.fn();
    (useNews as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: true,
      refetch: refetchMock,
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );

    expect(getByTestId('error-message')).toBeTruthy();
    const retryButton = getByTestId('retry-button');
    fireEvent.press(retryButton);
    expect(refetchMock).toHaveBeenCalled();
  });

  it('shows empty list message if there are no results', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );

    expect(getByTestId('empty-list-message')).toBeTruthy();
  });

  it('shows empty list if news is undefined', () => {
    (useNews as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(
      <NewsListScreen navigation={navigation} />
    );

    expect(getByTestId('empty-list-message')).toBeTruthy();
  });

  it('loads favorites from AsyncStorage', async () => {
    const getItemMock = AsyncStorage.getItem as jest.Mock;
    getItemMock.mockResolvedValueOnce(JSON.stringify([2]));

    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 2, title: 'Noticia Favorita', content: 'Contenido favorito', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    await waitFor(() => {
      renderWithProviders(<NewsListScreen navigation={navigation} />);
    });

    expect(getItemMock).toHaveBeenCalledWith('favorites');
  });

  it('navigates to news detail when a news item is pressed', () => {
    const mockNavigate = jest.fn();
    const navigation = { navigate: mockNavigate };

    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: 'Noticia Uno', content: 'Contenido uno', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByText } = renderWithProviders(<NewsListScreen navigation={navigation} />);

    fireEvent.press(getByText('Noticia Uno'));

    expect(mockNavigate).toHaveBeenCalledWith('NewsDetail', { id: 1, title: 'Noticia Uno' });
  });

  it('filters correctly when showFavorites is true and the news is not favorite', () => {
    const { useSelector } = require('react-redux');
    (useSelector as jest.Mock).mockImplementation((selector) =>
      selector({ news: { favorites: [] } })
    );

    (useNews as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: 'Noticia Uno', content: 'Contenido uno', image: '', category: '', publishedAt: '', updatedAt: '', userId: 1, url: '', slug: '', thumbnail: '', status: '' }
      ],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    const NewsListScreen = require('../screens/NewsListScreen').default;
    const { getByTestId } = renderWithProviders(<NewsListScreen navigation={navigation} />);

    fireEvent.press(getByTestId('favorites-toggle'));

    expect(getByTestId('empty-list-message')).toBeTruthy();
  });
});