import { renderHook, act } from '@testing-library/react-hooks';
import { useNewsActions } from '../useNewsActions';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../../newsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useNewsActions', () => {
  it('debe despachar toggleFavorite con el id correcto', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useNewsActions());

    act(() => {
      result.current.toggleFavorite(42);
    });

    expect(mockDispatch).toHaveBeenCalledWith(toggleFavorite(42));
  });
});