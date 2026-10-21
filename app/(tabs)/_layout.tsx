import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: '#deff9a',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: 'rgba(255,255,255,0.05)',
          height: 64,
          paddingBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={26} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={26} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
