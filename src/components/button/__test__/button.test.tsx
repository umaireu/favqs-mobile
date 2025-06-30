import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../button';

describe('button Component', () => {
  it('should render button with title', () => {
    const { getByRole } = render(
      <Button title="Test Button" onPress={() => {}} />,
    );
    const button = getByRole('button', { name: 'Test Button' });
    expect(button).toBeTruthy();
  });

  it('should call onPress when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button title="Click Me" onPress={mockOnPress} />,
    );
    const button = getByRole('button', { name: 'Click Me' });

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button title="Disabled Button" onPress={mockOnPress} disabled={true} />,
    );
    const button = getByRole('button', { name: 'Disabled Button' });

    fireEvent.press(button!);

    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should show loading state when loading prop is true', () => {
    const { getByRole, queryByText } = render(
      <Button title="Loading Button" onPress={() => {}} loading={true} />,
    );

    const button = getByRole('button', { name: 'Loading Button' });

    expect(button).toBeTruthy();

    // Text should be hidden when loading (replaced by loading spinner)
    expect(queryByText('Loading Button')).toBeFalsy();
  });

  it('should not call onPress when loading', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <Button title="Loading Button" onPress={mockOnPress} loading={true} />,
    );

    const button = getByRole('button');
    fireEvent.press(button);

    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
