/* eslint-disable react/display-name */
import React from 'react'
import { Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import StudioScreen from './StudioScreen'
import UploadScreen from './UploadScreen'

const Tab = createBottomTabNavigator()


function TabStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ focused, color, size }) => {
            let icon = "▲"
            if(route.name === 'Home'){
              icon =<Icon name="md-home" size={30} color="black" />
            } else if(route.name === 'Setting'){
              icon =<Icon name="md-person" size={30} color="black" />
            } else if(route.name === 'Studio'){
              icon =<Icon name="ios-color-filter" size={30} color="black" />
            } else if(route.name === 'Upload'){
              icon =<Icon name="md-arrow-round-up" size={30} color="black" />
            }
            return <Text style={{color: focused && "#46c3ad" || "#888"}}>{icon}</Text>
          },
        })}
        tabBarOptions={{
          activeTintColor: "#FF6787",
          inactiveTintColor: "#888",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Studio" component={StudioScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabStack