import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Post } from '../types';
import { useNewsActions } from '../hooks/useNewsActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';

interface NewsCardProps {
  item: Post;
  onPress: () => void;
}

/**
 * Renders a news card component displaying an image, title, publication date, content snippet,
 * and actions for reading more or saving the news item as a favorite.
 *
 * @param {NewsCardProps} props - The props for the NewsCard component.
 * @param {NewsItem} props.item - The news item to display in the card.
 * @param {() => void} props.onPress - Callback invoked when the "Read More" button is pressed.
 *
 * @returns {JSX.Element} The rendered NewsCard component.
 *
 * @remarks
 * - Uses theming from the current context.
 * - Integrates with translation and Redux state for favorites.
 * - Allows toggling the favorite status of the news item.
 */
const NewsCard = ({ item, onPress }: NewsCardProps) => {
  const theme = useTheme();
  const { t } = useTranslation('news');
  const { toggleFavorite } = useNewsActions();
  const isFavorite = useSelector(React.useMemo(
    () => (state: RootState) => state.news.favorites.some(fav => fav === item.id),
    [item.id]
  )
);

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.cardInner}>
        <Card.Cover 
          source={{ uri: item.image }} 
          style={styles.cover}
          resizeMode="cover"
        />
        <Card.Title
          title={item.title}
          titleNumberOfLines={2}
          titleStyle={[styles.title, { color: theme.colors.onSurface }]}
          subtitle={item.publishedAt}
          subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
        />

        
        <Card.Content style={styles.content}>
          <Text 
            variant="bodyMedium" 
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{ color: theme.colors.onSurface }}
          >
            {item.content}
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button 
            mode="text" 
            onPress={onPress}
            textColor={theme.colors.primary}
          >
            {t('card.readMore')}
          </Button>
          <Button 
            mode="contained" 
            onPress={() => toggleFavorite(item.id)}
            icon={isFavorite ? "heart" : "heart-outline"}
          >
            {isFavorite ? t('card.saved') : t('card.save')}
          </Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    elevation: 1
  },
  cardInner: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  cover: {
    height: 160
  },
  content: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    marginRight: 16,
    fontSize: 12,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default NewsCard;