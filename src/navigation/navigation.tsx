import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/home/home';
import { Favorites } from '../screens/favorites/favorites';
import { Search } from '../screens/search/search';
import { theme } from '../theme';
import { Icon } from '../components';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const renderTabIcon = (iconName: any, focused: boolean) => (
    <View style={styles.tabItem}>
      <Icon iconName={iconName} focused={focused} />
    </View>
  );

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: 'FavQ',
        headerTitleStyle: {
          fontSize: 20,
        },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon('house', focused),
        }}
      />
      <BottomTabs.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused }) => renderTabIcon('heart', focused),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) =>
            renderTabIcon('magnifying-glass', focused),
        }}
      />
    </BottomTabs.Navigator>
  );
};
export const Navigation = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <BottomTabsNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    height: 60,
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
