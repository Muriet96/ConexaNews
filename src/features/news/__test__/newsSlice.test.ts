import newsReducer, { 
  setNews, 
  toggleFavorite, 
  setSearchQuery, 
  loadFavorites 
} from '../newsSlice';
import { Post } from '../types';

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  content: 'Test Content',
  image: 'test.jpg',
  category: 'test',
  publishedAt: '01/01/2023 00:00:00',
  updatedAt: '01/01/2023 00:00:00',
  userId: 1,
  url: 'https://test.com',
  slug: '',
  thumbnail: '',
  status: ''
};

describe('newsSlice reducer', () => {
  const initialState = {
    news: [],
    favorites: [],
    searchQuery: ''
  };

  it('should handle initial state', () => {
    expect(newsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setNews', () => {
    const actual = newsReducer(initialState, setNews([mockPost]));
    expect(actual.news).toEqual([mockPost]);
  });

  it('should handle toggleFavorite (add)', () => {
    const state = newsReducer(initialState, toggleFavorite(mockPost.id));
    expect(state.favorites).toEqual([mockPost.id]);
  });

  it('should handle toggleFavorite (remove)', () => {
    const stateWithFavorite = {
      ...initialState,
      favorites: [mockPost.id]
    };
    const state = newsReducer(stateWithFavorite, toggleFavorite(mockPost.id));
    expect(state.favorites).toEqual([]);
  });

  it('should handle setSearchQuery', () => {
    const actual = newsReducer(initialState, setSearchQuery('test'));
    expect(actual.searchQuery).toEqual('test');
  });

  it('should handle loadFavorites', () => {
    const actual = newsReducer(initialState, loadFavorites([1, 2, 3]));
    expect(actual.favorites).toEqual([1, 2, 3]);
  });
});