import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../newsSlice';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/config';

const Stack = createStackNavigator();

const mockNewsItem = {
  id: '1',
  title: 'Test News Title',
  image: 'https://example.com/image.jpg',
  content: 'This is the content of the test news article.',
  publishedAt: '2024-05-30',
  slug: 'test-news-title',
  url: 'https://example.com/news/1',
  thumbnail: 'https://example.com/thumb.jpg',
  status: 'published',
  author: 'Test Author',
  category: 'General',
  updatedAt: '2024-05-30',
  userId: 1
};

const createTestStore = (overrides = {}) => {
  return configureStore({
    reducer: {
      // @ts-ignore
      news: newsReducer,
    },
    preloadedState: {
      news: {
        news: [mockNewsItem],
        favorites: [],
        loading: false,
        error: null,
        searchQuery: '',
        ...overrides,
      },
    },
  });
};

const renderWithProviders = (store: any) => {
  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="NewsDetail"
              // @ts-ignore
              component={NewsDetailScreen}
              initialParams={{ id: mockNewsItem.id }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
};

jest.mock('react-native-gesture-handler', () => {
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({ children }: any) => children,
    Swipeable: ({ children }: any) => children,
    FlatList: jest.requireActual('react-native').FlatList,
    ScrollView: jest.requireActual('react-native').ScrollView,
    default: { install: jest.fn() },
  };
});

describe('NewsDetailScreen', () => {
  it('should render news details correctly', () => {
    const store = createTestStore();
    const { getByText } = renderWithProviders(store);

    expect(getByText('Add to favorites')).toBeTruthy();
    expect(getByText(mockNewsItem.title)).toBeTruthy();
    expect(getByText(mockNewsItem.publishedAt)).toBeTruthy();
    expect(getByText(mockNewsItem.content)).toBeTruthy();
  });

  it('should toggle favorite when button is pressed', () => {
    const store = createTestStore();
    const { getByText } = renderWithProviders(store);

    const button = getByText('Add to favorites');
    fireEvent.press(button);

    expect(store.getState().news.favorites).toContain('1');
  });

  it('should show "remove from favorites" if already favorite', () => {
    const store = createTestStore({ favorites: ['1'] });
    const { getByText } = renderWithProviders(store);

    expect(getByText('Remove from favorites')).toBeTruthy();

    fireEvent.press(getByText('Remove from favorites'));
    expect(store.getState().news.favorites).not.toContain('1');
  });

  it('should show not found if news does not exist', () => {
    const store = createTestStore({ news: [] });
    const { getByTestId } = renderWithProviders(store);

    expect(getByTestId('not-found-message')).toBeTruthy();
    expect(getByTestId('go-back-button')).toBeTruthy();
  });

  it('should call navigation.goBack when go back button is pressed', () => {
    const store = createTestStore({ news: [] });
    const mockGoBack = jest.fn();
    const navigation = { goBack: mockGoBack };

    const { getByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="NewsDetail"
                children={props => (
                  <NewsDetailScreen
                    {...props}
                    navigation={navigation as any}
                    route={{
                      ...props.route,
                      params: { id: Number(mockNewsItem.id), title: mockNewsItem.title }
                    }}
                  />
                )}
                initialParams={{ id: Number(mockNewsItem.id), title: mockNewsItem.title }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </I18nextProvider>
      </Provider>
    );

    fireEvent.press(getByTestId('go-back-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });
});