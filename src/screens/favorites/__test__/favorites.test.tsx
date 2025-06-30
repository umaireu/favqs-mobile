import { render, fireEvent } from '@testing-library/react-native';
import { Favorites } from '../favorites';
import { useHttp } from '../../../hooks/useHttp';
import { useLikeUnLikeQuote } from '../../../hooks/useLikeUnLikeQuote';

// Mock the hooks and navigation
jest.mock('../../../hooks/useHttp');
jest.mock('../../../hooks/useLikeUnLikeQuote');
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

const mockUseHttp = useHttp as jest.MockedFunction<typeof useHttp>;
const mockUseLikeUnLikeQuote = useLikeUnLikeQuote as jest.MockedFunction<
  typeof useLikeUnLikeQuote
>;

describe('favorites screen', () => {
  const mockFavoriteQuotes = [
    {
      qotd_date: '2024-01-01',
      quote: {
        id: 1,
        body: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        tags: ['motivation', 'work'],
        url: 'https://favqs.com/quotes/1',
        upvotes_count: 100,
        downvotes_count: 5,
        favorites_count: 50,
        dialogue: false,
        private: false,
      },
    },
    {
      qotd_date: '2024-01-02',
      quote: {
        id: 2,
        body: 'Innovation distinguishes between a leader and a follower.',
        author: 'Steve Jobs',
        tags: ['innovation', 'leadership'],
        url: 'https://favqs.com/quotes/2',
        upvotes_count: 85,
        downvotes_count: 3,
        favorites_count: 30,
        dialogue: false,
        private: false,
      },
    },
  ];

  const mockMakeHttpRequest = jest.fn();
  const mockHandleUnLikeQuote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for useLikeUnLikeQuote
    mockUseLikeUnLikeQuote.mockReturnValue({
      handleLikeQuote: jest.fn(),
      handleUnLikeQuote: mockHandleUnLikeQuote,
      saveFavoriteQuoteLoading: false,
      deleteFavoriteQuoteLoading: false,
    });
  });

  it('should show title successfully', () => {
    mockUseHttp.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
      makeHttpRequest: mockMakeHttpRequest,
      reset: jest.fn(),
    });

    const { getByText } = render(<Favorites />);

    expect(getByText('Favorite Quotes')).toBeTruthy();
  });

  it('should show error state when fetch fails', () => {
    const errorMessage = 'Failed to fetch favorites';
    mockUseHttp.mockReturnValue({
      data: null,
      loading: false,
      error: new Error(errorMessage),
      refetch: jest.fn(),
      makeHttpRequest: mockMakeHttpRequest,
      reset: jest.fn(),
    });

    const { getByText } = render(<Favorites />);

    expect(getByText('Favorite Quotes')).toBeTruthy();
    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should show empty state when no favorites', () => {
    mockUseHttp.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      refetch: jest.fn(),
      makeHttpRequest: mockMakeHttpRequest,
      reset: jest.fn(),
    });

    const { getByText } = render(<Favorites />);

    expect(getByText('Favorite Quotes')).toBeTruthy();
    expect(getByText('No favorite quotes yet')).toBeTruthy();
    expect(
      getByText('Start adding quotes to your favorites from the Home screen'),
    ).toBeTruthy();
  });

  it('should display favorite quotes when data is loaded', () => {
    mockUseHttp.mockReturnValue({
      data: mockFavoriteQuotes,
      loading: false,
      error: null,
      refetch: jest.fn(),
      makeHttpRequest: mockMakeHttpRequest,
      reset: jest.fn(),
    });

    const { getByText } = render(<Favorites />);

    expect(getByText('Favorite Quotes')).toBeTruthy();
    expect(
      getByText('The only way to do great work is to love what you do.'),
    ).toBeTruthy();
    expect(
      getByText('Innovation distinguishes between a leader and a follower.'),
    ).toBeTruthy();
  });

  it('should call handleUnLikeQuote when unlike button is pressed', () => {
    mockUseHttp.mockReturnValue({
      data: mockFavoriteQuotes,
      loading: false,
      error: null,
      refetch: jest.fn(),
      makeHttpRequest: mockMakeHttpRequest,
      reset: jest.fn(),
    });

    const { getAllByRole } = render(<Favorites />);

    const likeButtons = getAllByRole('button', { name: 'Like' });

    fireEvent.press(likeButtons[0]);

    expect(mockHandleUnLikeQuote).toHaveBeenCalledWith(
      mockFavoriteQuotes[0].quote,
      undefined,
    );
  });
});
