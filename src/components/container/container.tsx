import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../theme';
import { Loading } from '../loading/loading';
import { ErrorCard } from '../error-card/error-card';

export const Container = ({
  title,
  children,
  loading = false,
  error,
}: {
  children: React.ReactElement;
  title: string;
  loading?: boolean;
  error?: string | Error | null;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerBorder} />
      </View>
      {!loading && error && <ErrorCard error={error} />}
      {loading && !error ? <Loading /> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  headerBorder: {
    width: 70,
    height: 3,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    ...theme.shadows.sm,
  },
  footer: {
    marginTop: theme.spacing.lg,
  },
});
