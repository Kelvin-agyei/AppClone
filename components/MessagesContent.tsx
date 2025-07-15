import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, View } from './Themed';

export default function MessagesContentInfo({ path }: { path: string }) {
  type Post = { id: number; title: string; body: string };
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (limit = 40) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setPostList(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMessage = ({ item }: { item: Post }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.messageTitle}>{item.title}</Text>
      <Text style={styles.messageBody}>{item.body}</Text>
      <Text style={styles.messageTimestamp}>Received just now ⏳</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6A0DAD" />
      ) : (
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F2FF', // Matches Notifications screen
    paddingTop: 0, // Remove top spacing
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 30,
  },
  messageBubble: {
    backgroundColor: '#E1ECF7',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  messageTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  messageBody: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 10,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
  },
});
