import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Quote } from '../../types';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

interface QuoteCardProps {
  quote: Quote;
  onLike?: (quote: Quote, quoteDate?: string) => void;
  onUnlike?: (quote: Quote, quoteDate?: string) => void;
  isLiked?: boolean;
  loading?: boolean;
  quoteDate?: string;
}

export const QuoteCard = ({
  quote,
  onLike,
  onUnlike,
  isLiked = false,
  loading,
  quoteDate,
}: QuoteCardProps) => {
  const handleLikePress = () => {
    if (isLiked) {
      onUnlike?.(quote, quoteDate);
    } else {
      onLike?.(quote, quoteDate);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <Text style={styles.quoteText} numberOfLines={6} ellipsizeMode="tail">
          {quote.body}
        </Text>

        <View style={styles.authorStatsRow}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Icon iconName="up-long" />
              <Text style={styles.statText}>{quote.upvotes_count}</Text>
            </View>
            <View style={styles.statItem}>
              <Icon iconName="down-long" />

              <Text style={styles.statText}>{quote.downvotes_count}</Text>
            </View>
          </View>

          <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
            — {quote.author}
          </Text>
        </View>

        {quote?.tags?.length > 0 && (
          <View style={styles.tagsContainer} accessibilityLabel={'tags'}>
            {quote.tags.map((tag, index) => (
              <View key={`${tag}-${index}`} style={styles.tag}>
                <Text style={styles.tagText}># {tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.likeSection}>
        <Button
          title={isLiked ? 'Liked' : 'Like'}
          size="sm"
          variant={isLiked ? 'primary' : 'outline'}
          onPress={handleLikePress}
          accessibilityLabel="Like"
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  content: {
    gap: theme.spacing.md,
  },
  quoteText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
  authorStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  author: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'right',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xs,
  },
  tag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  statIcon: {
    fontSize: 16,
  },
  statText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
    fontWeight: theme.typography.fontWeight.medium,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
