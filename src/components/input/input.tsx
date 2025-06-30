import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
} from 'react-native';
import { theme } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onIconPress?: () => void;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onIconPress,
  style,
  ...props
}: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    fontWeight: theme.typography.fontWeight.medium,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    minHeight: 48,
  },
  inputError: {
    borderColor: theme.colors.errorBorder,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  leftIcon: {
    paddingLeft: theme.spacing.md,
  },
  rightIcon: {
    paddingRight: theme.spacing.md,
    paddingLeft: theme.spacing.sm,
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.errorText,
    marginTop: theme.spacing.xs,
  },
});
