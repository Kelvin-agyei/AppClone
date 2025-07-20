// app/modal.tsx
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      {/* Header Title */}
      <Stack.Screen options={{ title: 'Archived Messages' }} />

      <Text style={styles.title}>Archived Messages</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 20 }}>
        You can view your archived messages here.
      </Text>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
