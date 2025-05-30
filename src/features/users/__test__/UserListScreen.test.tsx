import React from 'react';
import { render } from '@testing-library/react-native';
import UserListScreen from '../screens/UserListScreen';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

let mockUsersHook: {
  data: User[];
  isLoading: boolean;
  error: any;
} = {
  data: [],
  isLoading: false,
  error: null,
};

jest.mock('../hooks/useUsers', () => ({
  useUsers: () => mockUsersHook,
}));

jest.mock('react-redux', () => {
  const actualRedux = jest.requireActual('react-redux');
  return {
    ...actualRedux,
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
  };
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </QueryClientProvider>
    </Provider>
  );

describe('UserListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el indicador de carga si isLoading es true', () => {
    mockUsersHook = {
      data: [],
      isLoading: true,
      error: null,
    };

    const { getByTestId } = renderWithProviders(<UserListScreen />);
    expect(getByTestId('loading-message')).toBeTruthy();
  });

  it('muestra el mensaje de error si error existe', () => {
    mockUsersHook = {
      data: [],
      isLoading: false,
      error: true,
    };

    const { getByTestId } = renderWithProviders(<UserListScreen />);
    expect(getByTestId('error-message')).toBeTruthy();
  });

  it('muestra usuarios cuando hay datos', () => {
  mockUsersHook = {
    data: [{ id: 1, firstname: 'Ana', lastname: 'Gómez', email: 'ana@example.com', phone: '123456' }],
    isLoading: false,
    error: null,
  };

  (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
    selectorFn({ users: { users: mockUsersHook.data } })
  );

  const { getByText } = renderWithProviders(<UserListScreen />);

  expect(getByText('Ana Gómez')).toBeTruthy();
  expect(getByText('ana@example.com')).toBeTruthy();
  expect(getByText('123456')).toBeTruthy();
});

  it('muestra el mensaje de lista vacía si no hay usuarios', () => {
    mockUsersHook = {
      data: [],
      isLoading: false,
      error: null,
    };

    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({ users: { users: [] } })
    );

    const { getByTestId } = renderWithProviders(<UserListScreen />);
    expect(getByTestId('empty-list-message')).toBeTruthy();
  });
});