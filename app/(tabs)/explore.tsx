import { StyleSheet } from 'react-native';


import ExploreContentInfo from '@/components/ExploreContent';
import { Text, View } from '@/components/Themed';
import ExploreHeader from '../exploreHeader';

export default function exploreScreen() {
  return (
  <View>
    <View>
      <ExploreHeader />               // This is the header component for the Explore screen
    </View>
      
    <View style={styles.top}>
      <ExploreContentInfo path="@/components/ExploreContent" />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
top:{
    padding: 1

}
});
