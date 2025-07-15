import FontAwesome from '@expo/vector-icons/FontAwesome';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';


Font.loadAsync({
  'RockSalt-Regular': require('../../assets/fonts/RockSalt-Regular.ttf'),
});


import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';



// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'purple',    // Change the active tab color to red
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'CNETWK',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitleAlign: 'center',
            headerTitleStyle: {
            fontSize: 20,
            color: 'purple', // Change the home-header title color to purple
            fontFamily: 'RockSalt-Regular', // Use the custom font
    },


          
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-o"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/rocket" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="rocket-outline"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginLeft: 20, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color }) => <TabBarIcon name="connectdevelop" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="user-o"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"         // name of the tab
        options={{
          // title: 'Explore',   //title for the tab
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,   //icon for the tab
          headerShown: false, // Disable the header for this tab
          // headerTitle: () => <ExploreSearchBarFunction />,
          
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: '🔔 Notifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          tabBarLabel: 'Notifications'
        }}
/>
      <Tabs.Screen
        name="messages"
        options={{
          title: '💬 Messages',
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="envelope" color={color} />,
          headerRight: () => (
            <Link href="/archivedMessages" asChild >
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="archive-sharp"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          
        }}
      />
    </Tabs>
  );
}
