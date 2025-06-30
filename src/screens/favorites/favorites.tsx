import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FavoriteQuote, Quote } from '../../types';
import { Container, List, QuoteCard } from '../../components';
import { theme } from '../../theme';
import { useHttp } from '../../hooks/useHttp';
import { getFavoriteQuotes } from '../../services/favq.service';
import { useLikeUnLikeQuote } from '../../hooks/useLikeUnLikeQuote';

export const Favorites = () => {
  const { data, loading, error, makeHttpRequest } = useHttp({
    functionToCall: getFavoriteQuotes,
    autoExecute: false,
  });
  const [favQuotes, setFavQuotes] = useState<FavoriteQuote[]>([]);

  const onSuccessUnLike = useCallback((quote: Quote) => {
    setFavQuotes(prev => prev.filter(item => item.quote.id !== quote.id));
  }, []);

  const { handleUnLikeQuote } = useLikeUnLikeQuote({
    onSuccessUnLike,
  });

  useEffect(() => {
    if (data) {
      setFavQuotes(data);
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      makeHttpRequest();
    }, [makeHttpRequest]),
  );

  const renderItem = useCallback(
    ({ item }: { item: FavoriteQuote }) => (
      <View style={styles.quoteItem}>
        <QuoteCard
          quote={item.quote}
          isLiked={true}
          onUnlike={handleUnLikeQuote}
        />
      </View>
    ),
    [handleUnLikeQuote],
  );

  return (
    <Container title="Favorite Quotes" loading={loading} error={error}>
      <List
        data={favQuotes}
        renderItem={renderItem}
        keyExtractor={item => item.quote.id.toString()}
        emptyTitle="No favorite quotes yet"
        emptySubtitle="Start adding quotes to your favorites from the Home screen"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  quoteItem: {
    marginBottom: theme.spacing.md,
  },
});
