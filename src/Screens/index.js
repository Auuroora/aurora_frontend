/* eslint-disable react/display-name */
// Import React module and components
import React from "react"
import { Text } from "react-native"
import { connect } from "react-redux"

// Import navigations
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Import UI module
import Icon from "react-native-vector-icons/Ionicons"

// Screen Import
import HomeScreen from "./HomeScreen"
import SettingScreen from "./SettingScreen"
import StudioScreen from "./StudioScreen"
import UploadScreen from "./UploadScreen"
import MypageScreen from "./MypageScreen"
import Purchase from "./MypageScreen/Purchase"
import MoreOrderList from "./MypageScreen/MoreOrderList"
import Sell from "./MypageScreen/Sell"
import Like from "./MypageScreen/Like"
import LoginScreen from "./LoginScreen"
import Signup from "./LoginScreen/Signup"
import OrderScreen from "./OrderScreen"
import PaymentScreen from "./PaymentScreen"
import DetailScreen from "./HomeScreen/detail"
import ModifyScreen from "./HomeScreen/modifyPost"
import SearchScreen from './SearchScreen'

// Import functions
import {
  getUserData,
  storeUserData,
} from "../Store/actions/authAction"


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
  token: state.auth.token,
})

const mapDispatchToProps = (dispatch) => ({
  storeUserData: (data) => dispatch(storeUserData(data)),
})

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Detail"
        component={DetailScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Order"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Payment"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ModifyPost"
        component={ModifyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchScreen"
        component={SearchScreen}
      />
    </Stack.Navigator>
  )
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Detail"
        component={DetailScreen}
      />
    </Stack.Navigator>
  )
}

function MypageStack() {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyPage"
        component={MypageScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settingstack"
        component={SettingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PurchaseStack"
        component={PurchaseStack}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Sell"
        component={Sell}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Like"
        component={Like}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Detail"
        component={DetailScreen}
      />
    </Stack.Navigator>
  )
}

function PurchaseStack() {
  return (
    <Stack.Navigator initialRouteName="Purchase">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Purchase"
        component={Purchase}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MoreOrderList"
        component={MoreOrderList}
      />
    </Stack.Navigator>
  )
}
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Signup}
      />
    </Stack.Navigator>
  )
}

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused, color, size }) => {
          let icon = "▲"

          if (route.name === 'Home') {
            icon = <Icon name="md-home" size={30} />
          } else if (route.name === 'Mypage') {
            icon = <Icon name="md-person" size={30} />
          } else if (route.name === 'Search') {
            icon = <Icon name="ios-search" size={30}/>
          } else if (route.name === 'Studio') {
            icon = <Icon name="ios-color-filter" size={30} />
          } else if (route.name === 'Upload') {
            icon = <Icon name="md-arrow-round-up" size={30} />
          }
          return <Text style={{ color: focused && "#FF6787" || "#FEFEFE", marginTop: 5 }}>{icon}</Text>

        }
      })}
      tabBarOptions={{
        activeTintColor: "#FF6787",
        inactiveTintColor: "#FEFEFE",
      }}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeStack}
        listeners={({navigation}) =>({
          tabPress: e => {
            navigation.navigate('Home', {refresh : true})
          },
        })}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Studio"
        component={StudioScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Upload"
        component={UploadScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Mypage"
        component={MypageStack}
      />
    </Tab.Navigator>
  )
}

class RootNavigator extends React.Component {
  constructor(props) {
    super(props)
    // Get token when app starts, if token not exists, go to login page
    getUserData("userToken")
      .then((data) => {
        if (!data) {
          this.props.storeUserData({ token: null })
          return
        }
        this.props.storeUserData({ token: data })
        this.setState({ isLoggedin: data })
      })
      .catch((err) => {
        alert("Failed to login : ", err)
      })
  }

  render() {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator >
          {this.props.token === null ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={AuthStack}
            />
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="TabStack"
              component={TabStack}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootNavigator)
