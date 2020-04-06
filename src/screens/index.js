import React from 'react'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from 'react-navigation-tabs'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import SomethingScreen from './SomethingScreen'

const HomeStack = createStackNavigator(
  {
    HomeScreen
  },
  // if you need.
  // recommend custom header
  {
    defaultNavigationOptions: () => ({
      title: 'Home',
    }),
  }
)
const SettingStack = createStackNavigator(
  {
    SettingScreen,
    SomethingScreen
  },
  {
    defaultNavigationOptions: () => ({
      title: 'Setting',
    }),
    initialRouteName: 'SettingScreen',
  }
)

// eslint-disable-next-line react/prop-types
const TabBarIcon = ({focused}) => {
  // eslint-disable-next-line no-undef
  const {routeName} = navigation.state
  let icon = "▲"

  if(routeName === 'Home'){
    icon = "🌈"
  } else if(routeName === 'Setting'){
    icon = "🌙"
  } 

  // can use react-native-vector-icons
  // <Icon name={iconName} size={iconSize} color={iconColor} />
  return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Setting: SettingStack,
  },
  {
    defaultNavigationOptions: () => ({
      tabBarIcon: TabBarIcon
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    },
  }
)

const AppStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: () => ({
        header: null,
      }),
    },
  }
)

export default createAppContainer(AppStack)