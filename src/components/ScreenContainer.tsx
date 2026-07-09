import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme';

interface ScreenContainerProps extends PropsWithChildren {
  scroll?: boolean;
}

export function ScreenContainer({ children, scroll = true }: ScreenContainerProps) {
  const Content = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={styles.safeArea}>
      <Content style={styles.content} contentContainerStyle={scroll ? styles.scrollContent : undefined}>
        {children}
      </Content>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  scrollContent: {
    paddingVertical: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
});
