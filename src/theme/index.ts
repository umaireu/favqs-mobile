export const theme = {
  colors: {
    primary: '#1DA1F2',
    secondary: '#17BF63',

    // Backgrounds
    background: '#FFFFFF',
    surface: '#F8F9FA',
    cardBackground: '#f5f6fb',

    // Text
    textPrimary: '#3a424d',
    textSecondary: '#657786',
    errorText: '#FF6B6B',
    onPrimary: '#FFFFFF',

    // Borders
    border: '#E1E8ED',
    errorBorder: '#FF6B6B',

    // Dark theme
    dark: {
      background: '#15202B',
      surface: '#192734',
      textPrimary: '#FFFFFF',
      textSecondary: '#8899A6',
      onPrimary: '#FFFFFF',
      border: '#38444D',
    },
  },

  typography: {
    // Font families
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },

    // Font sizes
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },

    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },

    // Font weights
    fontWeight: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  },
};

export type Theme = typeof theme;
