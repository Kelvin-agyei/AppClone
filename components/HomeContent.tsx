import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_PURPLE = '#4B0082';

const INTERESTS = [
  'AI', 'Fitness', 'Startups', 'Music', 'Gaming', 'Tech Talks',
  'Design', 'Photography', 'Spirituality', 'Health', 'Entrepreneurship', 'Networking'
];

const RECOMMENDED_TOPICS = ['AI Events', 'UX Meetups', 'Weekend Hackathons', 'Remote Jobs', 'Local Workshops'];

export default function HomeContentInfo() {
  const [selectedTab, setSelectedTab] = useState('Suggested');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View><Text style={styles.title}>Work Events Ahead</Text></View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <Tab label="Going" active={selectedTab === 'Going'} onPress={() => setSelectedTab('Going')} />
        <Tab label="Saved" active={selectedTab === 'Saved'} onPress={() => setSelectedTab('Saved')} />
        <Tab label="Suggested" badgeCount={5} active={selectedTab === 'Suggested'} onPress={() => setSelectedTab('Suggested')} />
      </View>

      {/* Suggestion Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get suggestions for events</Text>
        <Text style={styles.cardText}>
          You have 5 suggestions for upcoming events
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View suggested events</Text>
        </TouchableOpacity>
      </View>

      {/* Your Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your groups</Text>
        <Text style={styles.sectionText}>You have not joined any groups</Text>
        <Text style={styles.link}>Discover groups</Text>
      </View>

      {/* Start a new group */}
      <TouchableOpacity style={styles.groupStart}>
        <Text style={styles.groupTitle}>🏆 Start a new group</Text>
        <Text style={styles.groupText}>Organize your own events</Text>
      </TouchableOpacity>

      {/* Interests */}
      <View style={styles.section}>
        <View style={styles.interestHeader}>
          <Text style={styles.sectionTitle}>Your interests</Text>
          <Text style={styles.link}>Edit</Text>
        </View>
      </View>

      {/* Interest Tags */}
      <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.tagWrap}>
          {INTERESTS.map((tag, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Featured Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Featured Events</Text>
        <Text style={styles.sectionText}>Don’t miss out on trending events in your city</Text>
      </View>

      {/* Popular Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👑 Popular Groups</Text>
        <Text style={styles.sectionText}>Join groups with the most active members</Text>
      </View>

      {/* Recommended Topics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Recommended Topics</Text>
        {RECOMMENDED_TOPICS.map((topic, i) => (
          <Text style={styles.bulletText} key={i}>• {topic}</Text>
        ))}
      </View>

      {/* Connect & Work Button */}
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>🤝 Connect & Work</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type TabProps = {
  label: string;
  active?: boolean;
  badgeCount?: number;
  onPress?: () => void;
};

const Tab: React.FC<TabProps> = ({ label, active, badgeCount, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.tab, active && styles.activeTab]}>
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {label}
      </Text>
      {badgeCount ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      ) : null}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 2,
    borderColor: PURPLE,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#444',
  },
  activeTabText: {
    color: PURPLE,
  },
  badge: {
    backgroundColor: PURPLE,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: DARK_PURPLE,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK_PURPLE,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
  },
  link: {
    fontSize: 15,
    color: PURPLE,
    marginTop: 6,
    fontWeight: '600',
  },
  groupStart: {
    backgroundColor: LIGHT_PURPLE,
    padding: 20,
    borderRadius: 14,
    marginBottom: 40,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: PURPLE,
  },
  groupText: {
    fontSize: 14,
    color: '#555',
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    marginBottom: 40,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: LIGHT_PURPLE,
    borderColor: PURPLE,
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    color: PURPLE,
    fontWeight: '700',
    fontSize: 15,
  },
  bulletText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  bigButton: {
    marginTop: 30,
    marginBottom: 60,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bigButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
