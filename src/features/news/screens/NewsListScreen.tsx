import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {ActivityIndicator, Text, Searchbar, useTheme, Button, IconButton, Surface} from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import { StackScreenProps } from '@react-navigation/stack';
import { NewsStackParamList } from '../../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFavorites } from '../newsSlice';
import {RootState} from '../../../store/types';

type Props = StackScreenProps<NewsStackParamList, 'NewsList'>;

/**
 * Displays a list of news articles with search and favorites filtering functionality.
 *
 * This screen fetches news data, allows users to search articles by title or content,
 * and toggle the display of favorite articles. It handles loading and error states,
 * and persists favorite articles using AsyncStorage.
 *
 * @component
 * @param {Props} props - The navigation props for the screen.
 * @returns {JSX.Element} The rendered news list screen.
 *
 * @example
 * <NewsListScreen navigation={navigation} />
 *
 * @remarks
 * - Uses `useNews` hook for fetching news data.
 * - Integrates with Redux for managing favorites.
 * - Supports localization via `useTranslation`.
 * - Displays loading and error states with retry capability.
 */
const NewsListScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation('news');
  const { data: news, isLoading, error, refetch } = useNews();
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.news);
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredNews = useMemo(() => {
    if (!news) return [];
    return news.filter(item => {
      if (showFavorites && !favorites.includes(item.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [news, searchQuery, showFavorites, favorites]);


  useEffect(() => {
    AsyncStorage.getItem('favorites').then(data => {
      if (data) {
        dispatch(loadFavorites(JSON.parse(data)));
      }
    });
  }, [dispatch]);


  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" testID="loading-indicator" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text variant="bodyLarge" style={{ color: theme.colors.error }} testID="error-message">
          {t('errors.loadNews')}
        </Text>
        <Button
          mode="contained" 
          onPress={() => refetch()}
          style={styles.retryButton}
          testID="retry-button"
        >
          {t('common.retry')}
        </Button>
      </View>
    );
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.filterBar}>
        <Searchbar
          placeholder={t('listScreen.searchPlaceholder')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          theme={{ colors: { elevation: { level3: theme.colors.surfaceVariant } } }}
        />
        <IconButton
          testID="favorites-toggle"
          icon={showFavorites ? "heart" : "heart-outline"}
          mode="contained"
          onPress={() => setShowFavorites(!showFavorites)}
          size={24}
          iconColor={theme.colors.onPrimary}
          containerColor={theme.colors.primary}
        />
      </View>
      
      <FlatList
        data={filteredNews}
        renderItem={({ item }) => (
          <NewsCard 
            item={item}
            onPress={() => navigation.navigate('NewsDetail', { id: item.id, title: item.title })}
          />
        )
        }
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText} testID='empty-list-message'>
            {searchQuery ? t('listScreen.emptyResults') : t('common.emptyList')}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  searchBar: {
    borderRadius: 8,
    elevation: 2,
    flex: 1
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
  },
  retryButton: {
    marginTop: 16,
  },
});

export default NewsListScreen;