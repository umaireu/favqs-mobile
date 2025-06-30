import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';

interface ErrorCardProps {
  error: string | Error;
}
export const ErrorCard = ({ error }: ErrorCardProps) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
      <Text style={styles.errorMessage}>
        {typeof error === 'string' ? error : error.message}
      </Text>
    </View>
  );
};

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
