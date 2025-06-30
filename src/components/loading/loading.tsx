import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface LoadingProps {
  size?: 'small' | 'large';
  text?: string;
  inline?: boolean; // For use inside buttons or other components
}

export const Loading = ({
  size = 'large',
  text,
  inline = false,
}: LoadingProps) => {
  return (
    <View style={inline ? styles.inlineContainer : styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
