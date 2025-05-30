import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../newsSlice';

export const useNewsActions = () => {
  const dispatch = useDispatch();
  
  const handleToggleFavorite = (postId: number) => {
    dispatch(toggleFavorite(postId));
  };

  return { toggleFavorite: handleToggleFavorite };
};