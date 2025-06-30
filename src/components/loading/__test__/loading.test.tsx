import { render } from '@testing-library/react-native';
import { Loading } from '../loading';

describe('loading component', () => {
  it('should render text when provided', () => {
    const { getByText } = render(<Loading text="Loading data..." />);

    expect(getByText('Loading data...')).toBeTruthy();
  });

  it('should not render text when not provided', () => {
    const { queryByText } = render(<Loading />);

    expect(queryByText(/./)).toBeFalsy();
  });
});
