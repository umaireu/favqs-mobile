import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteQuote } from '../types';
import { logDetails } from '../utils/utils';

const FAVORITES_KEY = 'favorites';

export const getFavqFromStorage = async (): Promise<FavoriteQuote[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    logDetails({
      message: 'Error getting favorites (localstorage)',
      additionalArgs: [error],
    });
    throw new Error('Failed to get favorites');
  }
};

export const addFavqToStorage = async (quote: FavoriteQuote): Promise<void> => {
  try {
    const favorites = await getFavqFromStorage();
    const isAlreadyFavorite = favorites.some(
      fav => fav.quote.id === quote.quote.id,
    );

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, quote];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
    }
  } catch (error) {
    logDetails({
      message: 'Error adding favorites (localstorage)',
      additionalArgs: [error],
    });
    throw new Error('Failed to add favorite');
  }
};

export const removeFavqFromStorage = async (quoteId: number): Promise<void> => {
  try {
    const favorites = await getFavqFromStorage();
    const updatedFavorites = favorites.filter(fav => fav.quote.id !== quoteId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    logDetails({
      message: 'Error removing favorites (localstorage)',
      additionalArgs: [error],
    });
    throw new Error('Failed to remove favorite');
  }
};
