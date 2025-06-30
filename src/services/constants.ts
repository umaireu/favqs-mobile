export const API_ENDPOINTS = {
  EXTERNAL_FAVQ_API: {
    GET_QUOTE_OF_DAY: `/qotd`,
    SEARCH_QUOTES: `/quotes`,
  },
  INTERNAL_FAVQ_API: {
    GET_FAVORITE_QUOTES: `/quotes/favorites`,
    SAVE_FAVORITE_QUOTE: `/quotes/favorite`,
    DELETE_FAVORITE_QUOTE: `/quotes/favorite/:quoteId`,
  },
};

export const USE_LOCAL_STORAGE = true;
