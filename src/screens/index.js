import React from 'react'
import { Text} from 'react-native'
import {createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import SomethingScreen from './SomethingScreen'
import StudioScreen from './StudioScreen'
import UploadScreen from './UploadScreen'


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

const StudioStack = createStackNavigator(
  {
    StudioScreen
  },
  {
    defaultNavigationOptions: () => ({
      title: 'studio',
    }),
    initialRouteName: 'StudioScreen',
  }
)
const UploadStack = createStackNavigator(
  {
    UploadScreen
  },
  {
    defaultNavigationOptions: () => ({
      title: 'upload',
    }),
    initialRouteName: 'UploadScreen',
  }
)

// eslint-disable-next-line react/prop-types, no-unused-vars 
const TabBarIcon = ({focused, horizontal, tintColor}) => {
  // eslint-disable-next-line no-undef
  const {routeName} = navigation.state
  let icon = "▲"

  if(routeName === 'Home'){
    icon =<Icon name="md-home" size={30} color="black" />
  } else if(routeName === 'Setting'){
    icon =<Icon name="md-person" size={30} color="black" />
  } else if(routeName === 'Studio'){
    icon =<Icon name="ios-color-filter" size={30} color="black" />
  } else if(routeName === 'Upload'){
    icon =<Icon name="md-arrow-round-up" size={30} color="black" />
  } 
            
  // can use react-native-vector-icons
  // <Icon name={iconName} size={iconSize} color={iconColor} />
            
  return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Studio: StudioStack,
    Upload: UploadStack,
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