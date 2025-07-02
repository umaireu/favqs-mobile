import {
  FavoriteQuote,
  QuoteOfTheDayResponse,
  QuotesSearchResponse,
} from '../types';
import { buildRoute, delay } from '../utils/utils';
import { API_ENDPOINTS, USE_LOCAL_STORAGE } from './constants';
import {
  addFavqToStorage,
  getFavqFromStorage,
  removeFavqFromStorage,
} from './favq.storage.service';
import { httpClient } from './http.client';

export const getQuoteOfDay = async () => {
  const response = await httpClient.get<QuoteOfTheDayResponse>(
    API_ENDPOINTS.EXTERNAL_FAVQ_API.GET_QUOTE_OF_DAY,
    {
      isExternalApi: true,
    },
  );
  return response.data;
};

export const searchQuotes = async (searchQuery: string) => {
  const response = await httpClient.get<QuotesSearchResponse>(
    API_ENDPOINTS.EXTERNAL_FAVQ_API.SEARCH_QUOTES,
    {
      isExternalApi: true,
      params: {
        filter: searchQuery,
      },
    },
  );
  return response.data;
};

export const getFavoriteQuotes = async () => {
  if (USE_LOCAL_STORAGE) {
    await delay(1000);
    const response = await getFavqFromStorage();
    return response;
  } else {
    const response = await httpClient.get<FavoriteQuote[]>(
      API_ENDPOINTS.INTERNAL_FAVQ_API.GET_FAVORITE_QUOTES,
      {
        isExternalApi: false,
      },
    );
    return response.data;
  }
};

export const saveFavoriteQuote = async (data: FavoriteQuote) => {
  if (USE_LOCAL_STORAGE) {
    await delay(1000);
    await addFavqToStorage(data);
  } else {
    await httpClient.post<FavoriteQuote>(
      API_ENDPOINTS.INTERNAL_FAVQ_API.SAVE_FAVORITE_QUOTE,
      data,
      {
        isExternalApi: false,
      },
    );
  }
};

export const deleteFavoriteQuote = async (quoteId: number) => {
  if (USE_LOCAL_STORAGE) {
    await delay(1000);
    await removeFavqFromStorage(quoteId);
  } else {
    await httpClient.delete<void>(
      buildRoute(API_ENDPOINTS.INTERNAL_FAVQ_API.DELETE_FAVORITE_QUOTE, {
        quoteId,
      }),
      {
        isExternalApi: false,
      },
    );
  }
};
