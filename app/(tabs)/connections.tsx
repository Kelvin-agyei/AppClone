import { StyleSheet, ScrollView } from 'react-native';

import ConnectionsContentInfo from '@/components/ConnectionsContent';
import { View } from '@/components/Themed';

export default function connectionsScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ConnectionsContentInfo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
