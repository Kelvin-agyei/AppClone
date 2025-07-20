// This is the main screen for notifications

import { StyleSheet } from 'react-native';

import NotificationsContentInfo from '@/components/NotificationsContent';
import { View } from '@/components/Themed';

export default function notificationsScreen() {
  return (
    <View style={styles.container}>
      <NotificationsContentInfo path="app/(tabs)/four.tsx" />
    </View>
  );
}

// Styles for the notifications screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
