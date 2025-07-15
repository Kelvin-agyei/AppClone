

import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const timeTabs = ['Upcoming', 'Today', 'Tomorrow', 'Weekend'];

const categoryTabs = [
  { name: 'All Events', icon: 'calendar-outline' },
  { name: 'New Groups', icon: 'people-outline' },
  { name: 'Social', icon: 'balloon-outline' },
  { name: 'Hobbies', icon: 'color-palette-outline' },
  { name: 'Workshops', icon: 'construct-outline' },
  { name: 'Tech Talks', icon: 'laptop-outline' },
  { name: 'Games', icon: 'calendar-outline' },
  { name: 'Music', icon: 'people-outline' },
  { name: 'Arts', icon: 'balloon-outline' },
  { name: 'Education', icon: 'color-palette-outline' },
  { name: 'Writing', icon: 'construct-outline' },
  { name: 'Career $ Business', icon: 'laptop-outline' },
];

const lightTheme = {
  background: '#fff',
  card: '#f5f5f5',
  text: '#000',
  mutedText: '#555',
  inputBg: '#eee',
  accent: '#8000ff',
  tabBg: '#ddd',
  selectedCategoryBg: '#8000ff',
  selectedCategoryText: '#fff',
};

const darkTheme = {
  background: '#000',
  card: '#1c1c1c',
  text: '#fff',
  mutedText: '#888',
  inputBg: '#1c1c1c',
  accent: '#b266ff',
  tabBg: '#1c1c1c',
  selectedCategoryBg: '#fff',
  selectedCategoryText: '#000',
};

export default function ExploreTopSection() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? lightTheme : darkTheme;

  const [selectedTimeTab, setSelectedTimeTab] = useState('Upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔍 Search bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}>
        <TextInput
          placeholder="Explore events near you"
          placeholderTextColor={theme.mutedText}
          style={[styles.input, { color: theme.text }]}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Entypo name="dropbox" size={25} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* 🕒 Time Tabs */}
      <View style={styles.timeTabs}>
        {timeTabs.map((label, index) => {
          const isSelected = selectedTimeTab === label;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeTabButton,
                { backgroundColor: isSelected ? theme.accent : theme.tabBg },
              ]}
              onPress={() => setSelectedTimeTab(label)}
            >
              <Text
                style={{
                  color: isSelected
                    ? theme.selectedCategoryText
                    : theme.mutedText,
                  fontWeight: '600',
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🎨 Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categoryTabs.map((tab, index) => {
          const isSelected = selectedCategory === tab.name;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isSelected
                    ? theme.selectedCategoryBg
                    : theme.card,
                },
              ]}
              onPress={() => setSelectedCategory(tab.name)}
            >
              <Ionicons
                name={tab.icon as any}
                size={25}
                color={
                  isSelected
                    ? theme.selectedCategoryText
                    : theme.mutedText
                }
              />
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 12,
                  textAlign: 'center',
                  color: isSelected
                    ? theme.selectedCategoryText
                    : theme.mutedText,
                  fontWeight: isSelected ? '600' : 'normal',
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 2,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
  },
  timeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeTabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  categoryScroll: {
    marginTop: 10,
    paddingBottom: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    width: 80,
  },
});
