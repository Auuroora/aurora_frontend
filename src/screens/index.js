import React from 'react'
import { Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import TempSettingScreen from './TempSettingScreen'
import StudioScreen from './StudioScreen'
import UploadScreen from './UploadScreen'
import DetailScreen from './DetailScreen'


const HomeStack = createStackNavigator(
  {
    HomeScreen
  },
  // if you need.
  // recommend custom header
  {
    // eslint-disable-next-line no-unused-vars
    defaultNavigationOptions: ({navigation}) => ({
      title: 'Home',
    }),
  }
)
const SettingStack = createStackNavigator(
  {
    SettingScreen,
    TempSettingScreen
  },
  {
    // eslint-disable-next-line no-unused-vars
    defaultNavigationOptions: ({navigation}) => ({
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
    // eslint-disable-next-line no-unused-vars
    defaultNavigationOptions: ({navigation}) => ({
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
    // eslint-disable-next-line no-unused-vars
    defaultNavigationOptions: ({navigation}) => ({
      title: 'upload',
    }),
    initialRouteName: 'UploadScreen',
  }
)

const AppStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    DetailScreen : DetailScreen,
    TabNavigator: {
      screen: TabNavigator,
      // eslint-disable-next-line no-unused-vars
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Studio: StudioStack,
    Upload: UploadStack,
    Setting: SettingStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      // eslint-disable-next-line react/display-name, react/prop-types, no-unused-vars
      tabBarIcon: ({focused, horizontal, tintColor}) => {
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
                  
        return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
      }
    }),
    lazy: false,
    tabBarOptions: {
      activeTintColor: "#46c3ad",
      inactiveTintColor: "#888",
    },
  }
)

export default createAppContainer(AppStack)