import { View, Text, Button, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const ErrorFallback = ({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorTitle}>Oops! Something went wrong:</Text>
    <Text style={styles.errorMessage}>{error.toString()}</Text>
    <Button onPress={resetError} title="Try again" />
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  errorTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.errorText,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 20,
  },
});
