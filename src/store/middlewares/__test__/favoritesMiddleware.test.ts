import AsyncStorage from '@react-native-async-storage/async-storage';
import { favoritesMiddleware } from '../favoritesMiddleware';
import { toggleFavorite } from '@features/news/newsSlice';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('favoritesMiddleware', () => {
  const next = jest.fn();
  const getState = jest.fn(() => ({
    news: { favorites: [1, 2, 3] }
  }));
  const store = { getState } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    next.mockImplementation(action => action);
  });

  it('llama next(action) y guarda favoritos en AsyncStorage si la acción es toggleFavorite', () => {
    const action = toggleFavorite(1);

    const result = favoritesMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([1, 2, 3]));
    expect(result).toBe(action);
  });

  it('llama next(action) y NO guarda favoritos si la acción no es toggleFavorite', () => {
    const action = { type: 'other/action' };

    const result = favoritesMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(result).toBe(action);
  });
});