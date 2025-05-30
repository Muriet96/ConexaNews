import AsyncStorage from '@react-native-async-storage/async-storage';
import { languageMiddleware } from '../languageMiddleware';
import { setLanguage } from '@features/settings/settingsSlice';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

describe('languageMiddleware', () => {
  const next = jest.fn();
  const store = { getState: jest.fn() } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    next.mockImplementation(action => action);
  });

  it('llama next(action) y guarda el idioma en AsyncStorage si la acción es setLanguage', () => {
    const action = setLanguage('es');

    const result = languageMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('language', 'es');
    expect(result).toBe(action);
  });

  it('llama next(action) y NO guarda el idioma si la acción no es setLanguage', () => {
    const action = { type: 'other/action', payload: 'fr' };

    const result = languageMiddleware(store)(next)(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(result).toBe(action);
  });
});