import { render, fireEvent } from '@testing-library/react-native';
import { QuoteCard } from '../quote-card';
import { Quote } from '../../../types';

const mockQuote: Quote = {
  id: 1,
  body: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs',
  tags: ['work', 'motivation', 'success'],
  url: 'https://favqs.com/quotes/1',
  favorites_count: 100,
  upvotes_count: 50,
  downvotes_count: 5,
  dialogue: false,
  private: false,
  user_details: {
    favorite: false,
    upvote: false,
    downvote: false,
  },
};

describe('quoteCard component', () => {
  it('should render quote content correctly', () => {
    const { getByText } = render(<QuoteCard quote={mockQuote} />);

    expect(getByText(mockQuote.body)).toBeTruthy();
    expect(getByText(`— ${mockQuote.author}`)).toBeTruthy();
    expect(getByText('50')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });

  it('should render tags correctly', () => {
    const { getByText } = render(<QuoteCard quote={mockQuote} />);

    mockQuote.tags.forEach(tag => {
      expect(getByText(`# ${tag}`)).toBeTruthy();
    });
  });

  it('should render like button with correct text when not liked', () => {
    const { getByText } = render(
      <QuoteCard quote={mockQuote} isLiked={false} />,
    );

    expect(getByText('Like')).toBeTruthy();
  });

  it('should render liked button with correct text when liked', () => {
    const { getByText } = render(
      <QuoteCard quote={mockQuote} isLiked={true} />,
    );

    expect(getByText('Liked')).toBeTruthy();
  });

  it('should call onLike when like button is pressed and not liked', () => {
    const mockOnLike = jest.fn();
    const { getByText } = render(
      <QuoteCard
        quote={mockQuote}
        onLike={mockOnLike}
        isLiked={false}
        quoteDate="2024-01-01"
      />,
    );

    fireEvent.press(getByText('Like'));

    expect(mockOnLike).toHaveBeenCalledWith(mockQuote, '2024-01-01');
  });

  it('should call onUnlike when like button is pressed and already liked', () => {
    const mockOnUnlike = jest.fn();
    const { getByText } = render(
      <QuoteCard
        quote={mockQuote}
        onUnlike={mockOnUnlike}
        isLiked={true}
        quoteDate="2024-01-01"
      />,
    );

    fireEvent.press(getByText('Liked'));

    expect(mockOnUnlike).toHaveBeenCalledWith(mockQuote, '2024-01-01');
  });

  it('should handle quote without tags', () => {
    const quoteWithoutTags: Quote = {
      ...mockQuote,
      tags: [],
    };

    const { queryByLabelText } = render(<QuoteCard quote={quoteWithoutTags} />);

    expect(queryByLabelText('tags')).toBeFalsy();
  });

  it('should truncate long quote text', () => {
    const longQuote: Quote = {
      ...mockQuote,
      body: 'This is a very long quote that should be truncated when it exceeds the maximum number of lines allowed in the component to maintain proper layout and readability.',
    };

    const { getByText } = render(<QuoteCard quote={longQuote} />);

    const quoteText = getByText(longQuote.body);
    expect(quoteText.props.numberOfLines).toBe(6);
    expect(quoteText.props.ellipsizeMode).toBe('tail');
  });

  it('should truncate long author name', () => {
    const quoteWithLongAuthor: Quote = {
      ...mockQuote,
      author: 'A Very Long Author Name That Should Be Truncated',
    };

    const { getByText } = render(<QuoteCard quote={quoteWithLongAuthor} />);

    const authorText = getByText(`— ${quoteWithLongAuthor.author}`);
    expect(authorText.props.numberOfLines).toBe(1);
    expect(authorText.props.ellipsizeMode).toBe('tail');
  });
});
