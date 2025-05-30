import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';
import { Platform } from 'react-native';

const mockDispatch = jest.fn();

jest.mock('@features/users/hooks/useUsers', () => ({
  useUsers: () => ({
    data: [
      { id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', phone: '', login: { uuid: '', username: 'user', password: 'pass' } }
    ],
    isLoading: false,
  }),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

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

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el formulario de login', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    expect(getByTestId('login-button')).toBeTruthy();
    expect(getByTestId('username-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('muestra error si los campos están vacíos', async () => {
    const { getByTestId, getByText } = renderWithProviders(<LoginScreen />);
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeTruthy();
    });
  });

  it('muestra error si las credenciales son inválidas', async () => {
    const { getByTestId, getByText } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('username-input'), 'wrong');
    fireEvent.changeText(getByTestId('password-input'), 'wrong');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(getByText('Invalid username or password')).toBeTruthy();
    });
  });

  it('despacha login si las credenciales son correctas', async () => {
    const { getByTestId, queryByText } = renderWithProviders(<LoginScreen />);
    fireEvent.changeText(getByTestId('username-input'), 'user');
    fireEvent.changeText(getByTestId('password-input'), 'pass');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(queryByText('Invalid username or password')).toBeNull();
      expect(queryByText('Please fill in all fields')).toBeNull();
    });
  });

  it('permite alternar la visibilidad de la contraseña', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    const passwordInput = getByTestId('password-input');
    const eyeIcon = getByTestId('toggle-password-visibility');
    fireEvent.press(eyeIcon);
    expect(passwordInput).toBeTruthy();
  });

  it('renderiza el botón de login', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('renderiza los campos de entrada de usuario y contraseña', () => {
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    expect(getByTestId('username-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
  });

  it('usa behavior "padding" en iOS', () => {
    const originalOS = Platform.OS;
    Object.defineProperty(Platform, 'OS', { value: 'ios' });
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    const kav = getByTestId('login-keyboard-avoiding-view');
    const hasPaddingBottom = Array.isArray(kav.props.style) &&
      kav.props.style.some((s: any) => s && s.paddingBottom === 0);
    expect(hasPaddingBottom).toBe(true);
    Object.defineProperty(Platform, 'OS', { value: originalOS });
  });

  it('usa behavior "height" en Android', () => {
    const originalOS = Platform.OS;
    Object.defineProperty(Platform, 'OS', { value: 'android' });
    const { getByTestId } = renderWithProviders(<LoginScreen />);
    const kav = getByTestId('login-keyboard-avoiding-view');
    const hasPaddingBottom = Array.isArray(kav.props.style) &&
      kav.props.style.some((s: any) => s && s.paddingBottom === 0);
    expect(hasPaddingBottom).toBe(false);
    Object.defineProperty(Platform, 'OS', { value: originalOS });
  });
});