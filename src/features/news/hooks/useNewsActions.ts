import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../newsSlice';

/**
 * Custom React hook that provides actions related to news posts.
 *
 * @returns An object containing the `toggleFavorite` function, which toggles the favorite status of a news post by its ID.
 *
 * @example
 * const { toggleFavorite } = useNewsActions();
 * toggleFavorite(123); // Toggles the favorite status for the post with ID 123
 */
export const useNewsActions = () => {
  const dispatch = useDispatch();
  
  const handleToggleFavorite = (postId: number) => {
    dispatch(toggleFavorite(postId));
  };

  return { toggleFavorite: handleToggleFavorite };
};