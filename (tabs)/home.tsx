import HomeContentInfo from '@/components/HomeContent';
import { StyleSheet, View } from 'react-native';

// ✅ Capitalized function name — very important for React Native
export default function HomeScreen() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {/* Visible title */}
        {/* <Text style={styles.title}>🖖 Heyy, new_user</Text> */}
        {/* Your HomeContentInfo component */}
        <HomeContentInfo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0', // light gray so you can see it
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#333',
  },

});
