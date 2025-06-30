import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Input } from '../input';

describe('input component', () => {
  it('should render input field', () => {
    const { getByDisplayValue } = render(
      <Input value="test value" onChangeText={() => {}} />,
    );

    expect(getByDisplayValue('test value')).toBeTruthy();
  });

  it('should render label when provided', () => {
    const { getByText } = render(
      <Input label="Email" value="" onChangeText={() => {}} />,
    );

    expect(getByText('Email')).toBeTruthy();
  });

  it('should show error message when error prop is provided', () => {
    const { getByText } = render(
      <Input error="This field is required" value="" onChangeText={() => {}} />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('should call onChangeText when text is changed', () => {
    const mockOnChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="initial" onChangeText={mockOnChangeText} />,
    );

    const input = getByDisplayValue('initial');
    fireEvent.changeText(input, 'new text');

    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('should render left icon when provided', () => {
    const { getByText } = render(
      <Input leftIcon={<Text>lIcon</Text>} value="" onChangeText={() => {}} />,
    );

    expect(getByText('lIcon')).toBeTruthy();
  });

  it('should render right icon and call onIconPress when pressed', () => {
    const mockOnIconPress = jest.fn();
    const { getByText } = render(
      <Input
        rightIcon={<Text>rIcon</Text>}
        onIconPress={mockOnIconPress}
        value=""
        onChangeText={() => {}}
      />,
    );

    const icon = getByText('rIcon');
    expect(icon).toBeTruthy();

    fireEvent.press(icon.parent!);
    expect(mockOnIconPress).toHaveBeenCalled();
  });
});
