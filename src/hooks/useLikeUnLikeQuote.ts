import { useCallback } from 'react';
import { Alert } from 'react-native';
import {
  saveFavoriteQuote,
  deleteFavoriteQuote,
} from '../services/favq.service';
import { useHttp } from './useHttp';
import { Quote } from '../types';

export const useLikeUnLikeQuote = ({
  onSuccessLike,
  onSuccessUnLike,
}: {
  onSuccessLike?: (quoteData: Quote) => void;
  onSuccessUnLike?: (quoteData: Quote) => void;
}) => {
  const {
    loading: saveFavoriteQuoteLoading,
    makeHttpRequest: saveFavoriteQuoteRequest,
  } = useHttp({
    functionToCall: saveFavoriteQuote,
    autoExecute: false,
  });

  const {
    loading: deleteFavoriteQuoteLoading,
    makeHttpRequest: deleteFavoriteQuoteRequest,
  } = useHttp({
    functionToCall: deleteFavoriteQuote,
    autoExecute: false,
  });

  const handleLikeQuote = useCallback(
    async (quoteData: Quote, quoteDate?: string) => {
      const result = await saveFavoriteQuoteRequest({
        quote: quoteData,
        qotd_date: quoteDate ?? '',
      });
      if (result === null) {
        Alert.alert('Error', 'Failed to save quote to favorites');
      } else {
        Alert.alert('Quote', 'Quote added to favorites');
        onSuccessLike?.(quoteData);
      }
    },
    [saveFavoriteQuoteRequest, onSuccessLike],
  );

  const handleUnLikeQuote = useCallback(
    async (quoteData: Quote) => {
      const result = await deleteFavoriteQuoteRequest(quoteData.id);

      if (result === null) {
        Alert.alert('Error', 'Failed to remove quote from favorites');
      } else {
        Alert.alert('Quote', 'Quote removed from favorites');
        onSuccessUnLike?.(quoteData);
      }
    },
    [deleteFavoriteQuoteRequest, onSuccessUnLike],
  );

  return {
    handleLikeQuote,
    handleUnLikeQuote,
    saveFavoriteQuoteLoading,
    deleteFavoriteQuoteLoading,
  };
};
