import { render, fireEvent } from '@testing-library/react-native';
import { Home } from '../home';
import { useHttp } from '../../../hooks/useHttp';
import { useLikeUnLikeQuote } from '../../../hooks/useLikeUnLikeQuote';

// Mock the hooks
jest.mock('../../../hooks/useHttp');
jest.mock('../../../hooks/useLikeUnLikeQuote');

const mockUseHttp = useHttp as jest.MockedFunction<typeof useHttp>;
const mockUseLikeUnLikeQuote = useLikeUnLikeQuote as jest.MockedFunction<
  typeof useLikeUnLikeQuote
>;

describe('home screen', () => {
  const mockQuoteData = {
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
  };

  const mockRefetch = jest.fn();
  const mockHandleLikeQuote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for useLikeUnLikeQuote
    mockUseLikeUnLikeQuote.mockReturnValue({
      handleLikeQuote: mockHandleLikeQuote,
      handleUnLikeQuote: jest.fn(),
      saveFavoriteQuoteLoading: false,
      deleteFavoriteQuoteLoading: false,
      saveFavoriteQuoteError: null,
      deleteFavoriteQuoteError: null,
    });
  });

  it('should show title successfully', () => {
    mockUseHttp.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText } = render(<Home />);

    expect(getByText('Quote of the Day')).toBeTruthy();
  });

  it('should show error state when fetch fails', () => {
    const errorMessage = 'Failed to fetch quote';
    mockUseHttp.mockReturnValue({
      data: null,
      loading: false,
      error: new Error(errorMessage),
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText, queryByRole } = render(<Home />);
    const newQuoteButton = queryByRole('button', { name: 'New Quote' });

    expect(getByText('Quote of the Day')).toBeTruthy();
    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
    expect(newQuoteButton).toBeFalsy();
  });

  it('should show quote card and new quote button when data is loaded', () => {
    mockUseHttp.mockReturnValue({
      data: mockQuoteData,
      loading: false,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText, getByRole } = render(<Home />);

    const newQuoteButton = getByRole('button', { name: 'New Quote' });
    expect(getByText('Quote of the Day')).toBeTruthy();
    expect(
      getByText('The only way to do great work is to love what you do.'),
    ).toBeTruthy();
    expect(newQuoteButton).toBeTruthy();
  });

  it('should call refetch when New Quote button is pressed', () => {
    mockUseHttp.mockReturnValue({
      data: mockQuoteData,
      loading: false,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText } = render(<Home />);

    const newQuoteButton = getByText('New Quote');
    fireEvent.press(newQuoteButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('should call handleLikeQuote when like button is pressed', () => {
    mockUseHttp.mockReturnValue({
      data: mockQuoteData,
      loading: false,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByRole } = render(<Home />);
    const likeButton = getByRole('button', { name: 'Like' });

    fireEvent.press(likeButton);

    expect(mockHandleLikeQuote).toHaveBeenCalledWith(
      mockQuoteData.quote,
      mockQuoteData.qotd_date,
    );
  });

  it('should not show quote card when no data', () => {
    mockUseHttp.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { queryByText } = render(<Home />);

    expect(
      queryByText('The only way to do great work is to love what you do.'),
    ).toBeFalsy();
    expect(queryByText('Steve Jobs')).toBeFalsy();
  });

  it('should show new quote button when no error', () => {
    mockUseHttp.mockReturnValue({
      data: null,
      loading: false,
      error: null,
      refetch: mockRefetch,
      makeHttpRequest: jest.fn(),
      reset: jest.fn(),
    });

    const { getByText } = render(<Home />);

    expect(getByText('New Quote')).toBeTruthy();
  });
});
