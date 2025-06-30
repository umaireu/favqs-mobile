import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Container, Button, QuoteCard } from '../../components';
import { useHttp } from '../../hooks/useHttp';
import { getQuoteOfDay } from '../../services/favq.service';
import { useLikeUnLikeQuote } from '../../hooks/useLikeUnLikeQuote';

export const Home = () => {
  const { data, loading, error, refetch } = useHttp({
    functionToCall: getQuoteOfDay,
    autoExecute: true,
  });

  const onSuccessLike = useCallback(() => {
    refetch();
  }, [refetch]);

  const { handleLikeQuote, saveFavoriteQuoteLoading } = useLikeUnLikeQuote({
    onSuccessLike,
  });

  return (
    <Container title="Quote of the Day" loading={loading} error={error}>
      <View>
        {data && (
          <QuoteCard
            quote={data.quote}
            quoteDate={data.qotd_date}
            onLike={handleLikeQuote}
            loading={saveFavoriteQuoteLoading}
          />
        )}

        {!error && (
          <View style={styles.newQuoteAction}>
            <Button title="New Quote" onPress={refetch} />
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  newQuoteAction: {
    marginTop: theme.spacing.lg,
  },
});
