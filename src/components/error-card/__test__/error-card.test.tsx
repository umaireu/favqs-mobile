import { render } from '@testing-library/react-native';
import { ErrorCard } from '../error-card';

describe('errorCard component', () => {
  it('should render error title', () => {
    const { getByText } = render(<ErrorCard error="Test error" />);

    expect(getByText('Oops! Something went wrong')).toBeTruthy();
  });

  it('should render error message when error is a string', () => {
    const errorMessage = 'Network connection failed';
    const { getByText } = render(<ErrorCard error={errorMessage} />);

    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('should render error message when error is an Error object', () => {
    const error = new Error('Something went wrong with the request');
    const { getByText } = render(<ErrorCard error={error} />);

    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText('Something went wrong with the request')).toBeTruthy();
  });
});
