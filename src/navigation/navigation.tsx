import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/home/home';
import { Favorites } from '../screens/favorites/favorites';
import { Search } from '../screens/search/search';

// Bottom Tabs
const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        // headerShown: false,
        animation: 'shift',
      }}
    >
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Favorites" component={Favorites} />
      <BottomTabs.Screen name="Search" component={Search} />
    </BottomTabs.Navigator>
  );
};
export const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};
