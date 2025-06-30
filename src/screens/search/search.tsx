import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Quote } from '../../types';
import {
  Container,
  Input,
  List,
  QuoteCard,
  Loading,
  Icon,
} from '../../components';
import { theme } from '../../theme';
import { useHttp } from '../../hooks/useHttp';
import { ErrorCard } from '../../components/error-card/error-card';
import { searchQuotes as searchQuotesService } from '../../services/favq.service';
import { useLikeUnLikeQuote } from '../../hooks/useLikeUnLikeQuote';

interface SearchState {
  searchQuery: string;
  searchResults: Quote[];
  hasSearched: boolean;
}

export const Search = () => {
  const { data, loading, error, makeHttpRequest } = useHttp({
    functionToCall: searchQuotesService,
    autoExecute: false,
  });
  const [state, setState] = useState<SearchState>({
    searchQuery: '',
    searchResults: [],
    hasSearched: false,
  });
  const { handleLikeQuote } = useLikeUnLikeQuote({});

  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setState(prevState => ({
          ...prevState,
          searchResults: [],
          hasSearched: false,
        }));
        return;
      }
      await makeHttpRequest(query);
    },
    [makeHttpRequest],
  );

  // Update search results when data changes
  useEffect(() => {
    if (data) {
      let quotesData = data.quotes;
      if (quotesData.length === 1 && quotesData[0].id === 0) {
        quotesData = [];
      }
      setState(prevState => ({
        ...prevState,
        searchResults: quotesData,
        hasSearched: true,
      }));
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(state.searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [state.searchQuery, performSearch]);

  const handleClearSearch = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      searchQuery: '',
      searchResults: [],
      hasSearched: false,
    }));
  }, []);

  const handleSearch = useCallback((text: string) => {
    setState(prevState => ({
      ...prevState,
      searchQuery: text,
      hasSearched: false,
    }));
  }, []);

  const renderSearchContent = () => {
    if (loading) {
      return <Loading text={`Searching for ${state.searchQuery}...`} />;
    }
    if (error) {
      return <ErrorCard error={error} />;
    }
    if (state.hasSearched) {
      return (
        <List
          data={state.searchResults}
          renderItem={({ item }) => (
            <View style={styles.quoteItem}>
              <QuoteCard quote={item} onLike={handleLikeQuote} />
            </View>
          )}
          keyExtractor={(item: Quote) => item.id.toString()}
          emptyTitle="No quotes found"
          emptySubtitle={`No results found for "${state.searchQuery}". Try different keywords or check spelling.`}
        />
      );
    }
  };

  return (
    <Container title="Search Quotes">
      <View>
        <Input
          placeholder="Search quotes ..."
          value={state.searchQuery}
          onChangeText={handleSearch}
          rightIcon={
            state.searchQuery ? (
              <Icon iconName="xmark" onPress={handleClearSearch} />
            ) : undefined
          }
        />

        {renderSearchContent()}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  quoteItem: {
    marginBottom: theme.spacing.md,
  },

  emptyState: {
    flex: 1,
  },
});
