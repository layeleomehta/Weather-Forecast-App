import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createAppContainer } from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs'; 

import HomeScreen from '../screens/homeScreen'; 
import SearchScreen from '../screens/searchScreen'; 

import Icon from 'react-native-vector-icons/MaterialIcons';

const bottomTabNavigator = createBottomTabNavigator(
    {
    'Current City' : HomeScreen,
    'Search City': SearchScreen
}, 

{
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Current City') {
          iconName = 'location-on';
        } else if (routeName === 'Search City') {
          iconName = 'search';
        }
        return (
          <Icon
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),
  },

); 

export default createAppContainer(bottomTabNavigator); 



