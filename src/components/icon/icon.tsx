import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { theme } from '../../theme';

interface IconProps {
  iconName: string;
  focused?: boolean;
  onPress?: () => void;
}
export const Icon = ({ iconName, focused, onPress }: IconProps) => {
  return (
    <FontAwesome6
      name={iconName as any}
      size={18}
      color={focused ? theme.colors.primary : theme.colors.textSecondary}
      iconStyle={'solid'}
      onPress={onPress}
    />
  );
};
