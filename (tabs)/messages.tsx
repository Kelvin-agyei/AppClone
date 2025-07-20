import { StyleSheet } from 'react-native';

import MessagesContentInfo from '@/components/MessagesContent';
import { View } from '@/components/Themed';

export default function messagesScreen() {
  return (
    <View style={styles.container}>
      
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <MessagesContentInfo path="app/(tabs)/five.tsx" />
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
