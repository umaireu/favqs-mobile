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
    error: saveFavoriteQuoteError,
    makeHttpRequest: saveFavoriteQuoteRequest,
  } = useHttp({
    functionToCall: saveFavoriteQuote,
    autoExecute: false,
  });

  const {
    loading: deleteFavoriteQuoteLoading,
    error: deleteFavoriteQuoteError,
    makeHttpRequest: deleteFavoriteQuoteRequest,
  } = useHttp({
    functionToCall: deleteFavoriteQuote,
    autoExecute: false,
  });

  const handleLikeQuote = async (quoteData: Quote, quoteDate?: string) => {
    await saveFavoriteQuoteRequest({
      quote: quoteData,
      qotd_date: quoteDate ?? '',
    });
    if (saveFavoriteQuoteError) {
      Alert.alert('Error', 'Failed to save quote to favorites');
    } else {
      Alert.alert('Quote', 'Quote added to favorites');
      onSuccessLike?.(quoteData);
    }
  };
  const handleUnLikeQuote = async (quoteData: Quote) => {
    await deleteFavoriteQuoteRequest(quoteData.id);
    if (deleteFavoriteQuoteError) {
      Alert.alert('Error', 'Failed to remove quote from favorites');
    } else {
      Alert.alert('Quote', 'Quote removed from favorites');
      onSuccessUnLike?.(quoteData);
    }
  };

  return {
    handleLikeQuote,
    handleUnLikeQuote,
    saveFavoriteQuoteLoading,
    deleteFavoriteQuoteLoading,
    saveFavoriteQuoteError,
    deleteFavoriteQuoteError,
  };
};
