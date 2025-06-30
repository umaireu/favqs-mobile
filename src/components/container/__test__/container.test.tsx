import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from '../container';

describe('container Component', () => {
  it('should render title and children', () => {
    const { getByText } = render(
      <Container title="Test Title">
        <Text>Test Content</Text>
      </Container>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should show loading when loading prop is true', () => {
    const { getByText, queryByText } = render(
      <Container title="Test Title" loading={true}>
        <Text>Test Content</Text>
      </Container>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(queryByText('Test Content')).toBeFalsy();
  });

  it('should show error card when error prop is provided', () => {
    const { getByText } = render(
      <Container title="Test Title" error="Something went wrong">
        <Text>Test Content</Text>
      </Container>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Oops! Something went wrong')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('should not show error when loading is true', () => {
    const { getByText, queryByText } = render(
      <Container title="Test Title" loading={true} error="Some error">
        <Text>Test Content</Text>
      </Container>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(queryByText('Oops! Something went wrong')).toBeFalsy(); // Error hidden when loading
  });
});
