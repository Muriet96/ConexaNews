import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../screens/SettingsScreen';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';
import { Alert } from 'react-native';

const mockLogout = jest.fn();
type MockUser = { firstname: string; lastname: string; email: string } | null;

const mockUseSettings: { user: MockUser; logout: () => void } = {
  user: {
    firstname: 'Juan',
    lastname: 'Pérez',
    email: 'juan@example.com'
  },
  logout: mockLogout
};

jest.mock('../hooks/useSettings', () => ({
  useSettings: () => mockUseSettings,
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement, language = 'es') => {
  i18n.changeLanguage(language);
  
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          {ui}
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );
};

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    i18n.changeLanguage('es');
    mockUseSettings.user = {
      firstname: 'Juan',
      lastname: 'Pérez',
      email: 'juan@example.com'
    };
  });

  it('debería mostrar el nombre y email del usuario', () => {
    const { getByText } = renderWithProviders(<SettingsScreen />);
    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('juan@example.com')).toBeTruthy();
  });

  it('debería cambiar el idioma al presionar los botones', async () => {
    const { getByText } = renderWithProviders(<SettingsScreen />);
    
    fireEvent.press(getByText('English'));
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(i18n.language).toBe('en');
    expect(getByText('Language')).toBeTruthy();
    
    fireEvent.press(getByText('Español'));
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(i18n.language).toBe('es');
    expect(getByText('Idioma')).toBeTruthy();
  });

  it('debería manejar el estado cuando no hay usuario', () => {
    mockUseSettings.user = null;
    const { getByText } = renderWithProviders(<SettingsScreen />);
    expect(getByText('No hay datos de usuario disponibles')).toBeTruthy();
  });

  it('should show the current language radio as selected', () => {
    const { getByLabelText } = renderWithProviders(<SettingsScreen />);
    const spanishRadio = getByLabelText('Español');
    expect(spanishRadio.props.accessibilityState.checked).toBe(true);

    const englishRadio = getByLabelText('English');
    expect(englishRadio.props.accessibilityState.checked).toBe(false);
  });

  it('should display texts in English when the language is set to English', async () => {
    const { getByText } = renderWithProviders(<SettingsScreen />, 'en');
    expect(getByText('Language')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('should show a confirmation Alert when pressing logout', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = renderWithProviders(<SettingsScreen />);
    fireEvent.press(getByText('Cerrar sesión'));
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining('¿Cerrar sesión?'),
      expect.stringContaining('¿Estás seguro de que deseas cerrar sesión?'),
      expect.arrayContaining([
        expect.objectContaining({ text: 'Cancelar', style: 'cancel' }),
        expect.objectContaining({ text: 'Confirmar', style: 'destructive', onPress: expect.any(Function) }),
      ])
    );
    alertSpy.mockRestore();
  });

  it('should call logout when confirming the logout Alert', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByText } = renderWithProviders(<SettingsScreen />);
    fireEvent.press(getByText('Cerrar sesión'));

    const alertButtons = alertSpy.mock.calls[0][2];
    if (Array.isArray(alertButtons) && alertButtons[1] && typeof alertButtons[1].onPress === 'function') {
      alertButtons[1].onPress();
    }

    expect(mockLogout).toHaveBeenCalledTimes(1);
    alertSpy.mockRestore();
  });
});