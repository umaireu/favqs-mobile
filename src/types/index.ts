export interface Quote {
  id: number;
  body: string;
  author: string;
  tags: string[];
  url: string;
  favorites_count: number;
  upvotes_count: number;
  downvotes_count: number;
  dialogue: boolean;
  private: boolean;
}

export interface QuoteOfTheDayResponse {
  qotd_date: string;
  quote: Quote;
}
export type FavoriteQuote = QuoteOfTheDayResponse;

export interface QuotesSearchResponse {
  quotes: Quote[];
}
