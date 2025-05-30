import settingsReducer, { login, logout, setLanguage } from '../settingsSlice';

describe('settingsSlice', () => {
  it('should handle login', () => {
    const user = { id: 1, firstname: 'Test', lastname: 'User', email: 'test@test.com', phone: '', login: { uuid: '', username: '', password: '' } };
    const state = settingsReducer(undefined, login(user));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('should handle logout', () => {
    const initialState = { isAuthenticated: true, language: 'es', user: { id: 1, firstname: 'Test', lastname: 'User', email: 'test@test.com', phone: '', login: { uuid: '', username: '', password: '' } } };
    const state = settingsReducer(initialState, logout());
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should handle setLanguage', () => {
    const state = settingsReducer(undefined, setLanguage('en'));
    expect(state.language).toBe('en');
  });
});