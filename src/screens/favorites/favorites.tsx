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

  const filteredFavQuotes = useCallback(
    (quote: Quote) => {
      const quotes = favQuotes.filter(item => item.quote.id !== quote.id);
      setFavQuotes(quotes);
    },
    [favQuotes],
  );

  const { handleUnLikeQuote } = useLikeUnLikeQuote({
    onSuccessUnLike: filteredFavQuotes,
  });

  useEffect(() => {
    if (data) {
      setFavQuotes(data);
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      makeHttpRequest();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container title="Favorite Quotes" loading={loading} error={error}>
      <List
        data={favQuotes}
        renderItem={({ item }) => (
          <View style={styles.quoteItem}>
            <QuoteCard
              quote={item.quote}
              isLiked={true}
              onUnlike={handleUnLikeQuote}
            />
          </View>
        )}
        keyExtractor={(item: FavoriteQuote) => item.quote.id.toString()}
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
