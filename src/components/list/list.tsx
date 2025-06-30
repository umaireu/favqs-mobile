import { useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, ListRenderItem } from 'react-native';
import { theme } from '../../theme';

interface ListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index?: number) => string;
  emptyTitle?: string;
  emptySubtitle?: string;
}

export const List = <T,>({
  data,
  renderItem,
  keyExtractor,
  emptyTitle = 'No items yet',
  emptySubtitle = 'Start exploring to find some items',
}: ListProps<T>) => {
  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>{emptyTitle}</Text>
        <Text style={styles.emptySubtext}>{emptySubtitle}</Text>
      </View>
    ),
    [emptyTitle, emptySubtitle],
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={renderEmptyState}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: theme.spacing.sm,
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
