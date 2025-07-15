import { Text } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const dummyHeadlines = [
  'AI Just Changed Everything',
  '5 Surprising Facts About the Future of Work',
  'What NASA Discovered on Mars This Week',
  'Top Tech Trends You Shouldn’t Ignore',
  'This Startup Raised $50M Overnight',
  'Is Quantum Computing Closer Than We Think?',
  'How Gen Z is Shaping the Workforce',
  'The Rise of AI-Powered News Apps',
  'Inside the Lab: Building Better Batteries',
  'The Truth About Tech Addiction'
];

const dummySummaries = [
  'A quick summary of key changes you need to know about AI in 2025.',
  'From hybrid schedules to AI co-workers, the new normal is here.',
  'Robotic rovers find new evidence of water deep beneath the surface.',
  'Experts reveal which trends will dominate the next decade.',
  'The founders share their strategy behind the blitz fundraising.',
  'Researchers claim a major breakthrough in quantum error correction.',
  'New surveys reveal how Gen Z reshapes company cultures.',
  'Apps like Perplexity are redefining the way we read news.',
  'Innovators are exploring how to increase battery density by 200%.',
  'How our digital habits are affecting mental health at scale.'
];

const { height: screenHeight } = Dimensions.get('window');

type Article = {
  id: string;
  imageUrl: string;
  headline: string;
  summary: string;
};

export default function DiscoverScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const fetchArticles = async () => {
    try {
      const res = await fetch('https://picsum.photos/v2/list?page=2&limit=10');
      const data = await res.json();
      const mapped = data.map((item: any, index: number) => ({
        id: item.id,
        imageUrl: item.download_url,
        headline: dummyHeadlines[index % dummyHeadlines.length],
        summary: dummySummaries[index % dummySummaries.length],
      }));
      setArticles(mapped);
    } catch (err) {
      console.error('Error fetching articles', err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: Article }) => (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isDark && styles.titleDark]} numberOfLines={2}>{item.headline}</Text>
        <Text style={[styles.summary, isDark && styles.summaryDark]} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.footerRow}>
          <View style={styles.avatarRow}>
            <Image
              source={{ uri: `https://i.pravatar.cc/40?u=${item.id}` }}
              style={styles.avatar}
            />
            <Text style={[styles.author, isDark && styles.authorDark]}>curioustheo</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Feather name="bookmark" size={20} color={isDark ? '#E0AFFF' : '#6D0080'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <FontAwesome name="headphones" size={20} color={isDark ? '#E0AFFF' : '#6D0080'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#E0AFFF" />
        }
        snapToInterval={screenHeight}
        getItemLayout={(_, index) => ({ length: screenHeight, offset: screenHeight * index, index })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5E9FF' },
  containerDark: { backgroundColor: '#2E003E' },
  card: {
    height: screenHeight,
    justifyContent: 'center',
    padding: 16,
  },
  cardLight: { backgroundColor: '#FFFFFF' },
  cardDark: { backgroundColor: '#3A003A' },
  image: { width: '100%', height: '45%', borderRadius: 12, marginBottom: 20 },
  textContainer: { flex: 1, justifyContent: 'flex-start' },
  title: { fontSize: 20, fontWeight: '700', color: '#4E007E', marginBottom: 8 },
  titleDark: { color: '#E0AFFF' },
  summary: { fontSize: 14, color: '#6D0080', marginBottom: 12 },
  summaryDark: { color: '#B992FF' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  author: {
    fontSize: 12,
    color: '#6D0080',
  },
  authorDark: {
    color: '#B992FF',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
