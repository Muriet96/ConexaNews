import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { 
  Button, 
  Card, 
  Text, 
  useTheme, 
  Surface, 
  Divider 
} from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {  RootState } from '../../../store/types';
import { toggleFavorite } from '../newsSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { NewsStackParamList } from '../../../navigation/types';

type Props = StackScreenProps<NewsStackParamList, 'NewsDetail'>;
type NewsDetailRouteProp = RouteProp<NewsStackParamList, 'NewsDetail'>;

const NewsDetailScreen = ({ navigation } : Props) => {
  const route = useRoute<NewsDetailRouteProp>();
  const { id } = route.params;
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation('news');
  
  const { news, favorites } = useSelector((state: RootState) => state.news);

  const newsItem = useMemo(
    () => news.find(item => item.id === id),
    [news, id]
  );

  const isFavorite = useMemo(
    () => favorites.some(item => item === id),
    [favorites, id]
  );

  if (!newsItem) {
    return (
      <Surface style={styles.center}>
        <Text variant="titleMedium" testID="not-found-message">{t('errors.newsNotFound')}</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.button}
          testID="go-back-button"
        >
          {t('actions.goBack')}
        </Button>
      </Surface>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(newsItem.id));
  };

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.cardWrapper}>
          <Card style={styles.card}>
            <Card.Cover 
              source={{ uri: newsItem.image }} 
              style={styles.image}
              resizeMode="cover"
            />
            
            <Card.Content style={styles.content}>
              <Text 
                variant="titleLarge" 
                style={[styles.title, { color: theme.colors.onSurface }]}
              >
                {newsItem.title}
              </Text>
              
              <View style={styles.metaContainer}>
                <Text 
                  variant="bodyMedium" 
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {newsItem.publishedAt}
                </Text>
              </View>

              <Divider style={styles.divider} />

              <Text 
                variant="bodyLarge" 
                style={[styles.body, { color: theme.colors.onSurface }]}
              >
                {newsItem.content}
              </Text>
            </Card.Content>

            <Card.Actions style={styles.actions}>
              <Button 
                mode="outlined" 
                onPress={handleToggleFavorite}
                icon={isFavorite ? "heart" : "heart-outline"}
                textColor={isFavorite ? theme.colors.error : theme.colors.primary}
                style={styles.favoriteButton}
                testID="favorite-toggle-button"
              >
                {isFavorite ? t('actions.removeFavorite') : t('actions.addFavorite')}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16
},
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 8,
    elevation: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#e0e0e0',
  },
  body: {
    lineHeight: 24,
    marginBottom: 16,
  },
  actions: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  favoriteButton: {
    borderWidth: 1.5,
  },
  button: {
    marginTop: 16,
  },
});

export default NewsDetailScreen;