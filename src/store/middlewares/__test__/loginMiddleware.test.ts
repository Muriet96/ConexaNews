import { login, logout } from '@features/settings/settingsSlice';
import { loginMiddleware } from '../loginMiddleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('loginMiddleware', () => {
  it('should save user and isAuthenticated on login', () => {
    const store = {
      getState: () => ({ settings: { user: { id: 1 }, isAuthenticated: true } }),
      dispatch: jest.fn()
    };
    const next = jest.fn();
    loginMiddleware(store)(next)(login({
      id: 1,
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      login: {
        uuid: '',
        username: '',
        password: '',
        md5: undefined,
        sha1: undefined,
        registered: undefined
      }
    }));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify({ id: 1 }));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
  });

  it('should remove user and set isAuthenticated false on logout', () => {
    const store = { 
      getState: () => ({}),
      dispatch: jest.fn()
    };
    const next = jest.fn();
    loginMiddleware(store)(next)(logout());
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('isAuthenticated', 'false');
  });
});