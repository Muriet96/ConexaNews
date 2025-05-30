import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { useUsers } from '../hooks/useUsers';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../services/users', () => ({
  fetchUsers: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('useUsers', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it('dispatches setUsers when data is available', async () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      data: [
        { 
          id: 1, 
          firstname: 'John', 
          lastname: 'Doe', 
          email: 'john@example.com', 
          phone: '1234567890' 
        }
      ],
      isLoading: false,
      error: null,
    }));

    renderHook(() => useUsers());

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it('does not dispatch setUsers if there is no data', async () => {
    require('@tanstack/react-query').useQuery.mockImplementation(() => ({
      data: undefined,
      isLoading: false,
      error: null,
    }));

    renderHook(() => useUsers());

    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});