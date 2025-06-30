import { httpClient } from '../http.client';
import { API_ENDPOINTS } from '../constants';
import { FavoriteQuote } from '../../types';
import * as favqService from '../favq.service';
import * as storageService from '../favq.storage.service';
import * as utils from '../../utils/utils';

// Mock dependencies
jest.mock('../http.client');
jest.mock('../favq.storage.service');

jest.mock('../../utils/utils', () => ({
  ...jest.requireActual('../../utils/utils'),
  delay: jest.fn(() => Promise.resolve()),
}));

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const mockStorageService = storageService as jest.Mocked<typeof storageService>;
const mockUtils = utils as jest.Mocked<typeof utils>;

describe('favq service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  describe('getQuoteOfDay', () => {
    it('should fetch quote of the day from external API', async () => {
      const mockResponse = {
        data: {
          qotd_date: '2024-01-01',
          quote: {
            id: 1,
            body: 'Test quote',
            author: 'Test Author',
            tags: ['motivation'],
            url: 'test-url',
            favorites_count: 10,
            upvotes_count: 5,
            downvotes_count: 2,
            dialogue: false,
            private: false,
          },
        },
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await favqService.getQuoteOfDay();

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.EXTERNAL_FAVQ_API.GET_QUOTE_OF_DAY,
        { isExternalApi: true },
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const error = new Error('API Error');
      mockHttpClient.get.mockRejectedValueOnce(error);

      await expect(favqService.getQuoteOfDay()).rejects.toThrow('API Error');
    });
  });

  describe('searchQuotes', () => {
    it('should search quotes with query parameter', async () => {
      const mockResponse = {
        data: {
          quotes: [
            {
              id: 1,
              body: 'Search result',
              author: 'Author',
              tags: ['test'],
              url: 'url',
              favorites_count: 1,
              upvotes_count: 1,
              downvotes_count: 0,
              dialogue: false,
              private: false,
            },
          ],
        },
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await favqService.searchQuotes('motivation');

      expect(mockHttpClient.get).toHaveBeenCalledWith(
        API_ENDPOINTS.EXTERNAL_FAVQ_API.SEARCH_QUOTES,
        {
          isExternalApi: true,
          params: { filter: 'motivation' },
        },
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getFavoriteQuotes', () => {
    it('should get favorites from local storage with delay', async () => {
      const mockFavorites: FavoriteQuote[] = [
        {
          qotd_date: '2024-01-01',
          quote: {
            id: 1,
            body: 'Favorite quote',
            author: 'Author',
            tags: ['favorite'],
            url: 'url',
            favorites_count: 1,
            upvotes_count: 1,
            downvotes_count: 0,
            dialogue: false,
            private: false,
          },
        },
      ];

      mockStorageService.getFavqFromStorage.mockResolvedValueOnce(
        mockFavorites,
      );

      const resultPromise = favqService.getFavoriteQuotes();

      expect(mockUtils.delay).toHaveBeenCalledWith(1000);

      jest.advanceTimersByTime(1000);

      const result = await resultPromise;

      expect(mockStorageService.getFavqFromStorage).toHaveBeenCalled();
      expect(result).toEqual(mockFavorites);
      expect(mockHttpClient.get).not.toHaveBeenCalled();
    });

    it('should handle storage errors', async () => {
      const error = new Error('Storage Error');
      mockStorageService.getFavqFromStorage.mockRejectedValueOnce(error);

      const resultPromise = favqService.getFavoriteQuotes();

      jest.advanceTimersByTime(1000);

      await expect(resultPromise).rejects.toThrow('Storage Error');
    });
  });

  describe('saveFavoriteQuote', () => {
    const mockQuote: FavoriteQuote = {
      qotd_date: '2024-01-01',
      quote: {
        id: 1,
        body: 'Quote to save',
        author: 'Author',
        tags: ['save'],
        url: 'url',
        favorites_count: 1,
        upvotes_count: 1,
        downvotes_count: 0,
        dialogue: false,
        private: false,
      },
    };

    it('should save quote to local storage', async () => {
      mockStorageService.addFavqToStorage.mockResolvedValueOnce();

      const resultPromise = favqService.saveFavoriteQuote(mockQuote);

      expect(mockUtils.delay).toHaveBeenCalledWith(1000);

      jest.advanceTimersByTime(1000);

      await resultPromise;

      expect(mockStorageService.addFavqToStorage).toHaveBeenCalledWith(
        mockQuote,
      );
    });

    it('should handle saveFavoriteQuote errors', async () => {
      const error = new Error('Save Error');

      mockStorageService.addFavqToStorage.mockRejectedValueOnce(error);

      const resultPromise = favqService.saveFavoriteQuote(mockQuote);

      jest.advanceTimersByTime(1000);

      await expect(resultPromise).rejects.toThrow('Save Error');
    });
  });
  describe('deleteFavoriteQuote', () => {
    const quoteId = 123;

    it('should delete quote from local storage with delay', async () => {
      mockStorageService.removeFavqFromStorage.mockResolvedValueOnce();

      const resultPromise = favqService.deleteFavoriteQuote(quoteId);

      expect(mockUtils.delay).toHaveBeenCalledWith(1000);

      jest.advanceTimersByTime(1000);

      await resultPromise;

      expect(mockStorageService.removeFavqFromStorage).toHaveBeenCalledWith(
        quoteId,
      );
    });

    it('should handle removeFavq errors', async () => {
      const error = new Error('Delete Error');
      mockStorageService.removeFavqFromStorage.mockRejectedValueOnce(error);

      const resultPromise = favqService.deleteFavoriteQuote(quoteId);

      jest.advanceTimersByTime(1000);

      await expect(resultPromise).rejects.toThrow('Delete Error');
    });
  });
});
