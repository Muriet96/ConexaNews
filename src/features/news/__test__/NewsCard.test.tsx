import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewsCard from '../components/NewsCard';
import { Provider, useSelector as useSelectorOriginal } from 'react-redux';
import { store } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';

jest.mock('../hooks/useNewsActions', () => ({
  useNewsActions: () => ({
    toggleFavorite: jest.fn(),
  }),
}));

jest.mock('react-redux', () => {
  const Actual = jest.requireActual('react-redux');
  return {
    ...Actual,
    useSelector: jest.fn(),
  };
});

const mockPost = {
  id: 1,
  title: 'Test Title',
  content: 'Test Content',
  image: 'https://test.com/image.jpg',
  category: 'test',
  publishedAt: '2023-01-01',
  updatedAt: '2023-01-01',
  userId: 1,
  url: 'https://test.com',
  slug: '',
  thumbnail: '',
  status: ''
};

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          {ui}
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );

describe('NewsCard', () => {
  beforeEach(() => {
    // @ts-ignore
    require('react-redux').useSelector.mockImplementation((selector) => selector({ news: { favorites: [] } }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el título, contenido y botones', () => {
    const { getByText } = renderWithProviders(
      <NewsCard item={mockPost} onPress={jest.fn()} />
    );
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
    expect(getByText(/read/i)).toBeTruthy();
    expect(getByText(/save/i)).toBeTruthy();
  });

  it('llama onPress cuando se presiona "read more"', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithProviders(
      <NewsCard item={mockPost} onPress={onPress} />
    );
    fireEvent.press(getByText(/read/i));
    expect(onPress).toHaveBeenCalled();
  });

  it('muestra "saved" y el icono correcto si es favorito', () => {
    // @ts-ignore
    require('react-redux').useSelector.mockImplementation((selector) => selector({ news: { favorites: [1] } }));
    const { getByText } = renderWithProviders(
      <NewsCard item={mockPost} onPress={jest.fn()} />
    );
    expect(getByText(/saved/i)).toBeTruthy();
  });

  it('llama toggleFavorite al presionar el botón de favorito', () => {
    const mockToggleFavorite = jest.fn();
    jest.spyOn(require('../hooks/useNewsActions'), 'useNewsActions').mockReturnValue({
      toggleFavorite: mockToggleFavorite,
    });
    const { getByText } = renderWithProviders(
      <NewsCard item={mockPost} onPress={jest.fn()} />
    );
    fireEvent.press(getByText(/save/i));
    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
  });
});