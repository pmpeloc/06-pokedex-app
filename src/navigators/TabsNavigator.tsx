/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchScreen } from '../screens/SearchScreen';
import { StackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarActiveTintColor: '#5856d6',
        tabBarLabelStyle: {
          marginBottom: 10,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10,
          borderWidth: 0,
          elevation: 0,
          height: 60, //( Platform.OS === 'ios') ? 70 : 80,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={StackNavigator}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
