import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { theme } from '../../theme';
import { Loading } from '../loading/loading';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    isDisabled && styles.disabled,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyles,
        pressed && !isDisabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      role="button"
      accessibilityLabel={rest.accessibilityLabel || title}
      {...rest}
    >
      {loading ? (
        <Loading size="small" inline />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Sizes
  sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  md: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  lg: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  outline: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  // Text styles
  text: {
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.onPrimary,
  },
  secondaryText: {
    color: theme.colors.background,
  },
  outlineText: {
    color: theme.colors.textPrimary,
  },

  // Text sizes
  smText: {
    fontSize: theme.typography.fontSize.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSize.base,
  },
  lgText: {
    fontSize: theme.typography.fontSize.lg,
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },
});
