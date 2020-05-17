/* eslint-disable react/display-name */
// Import React module and components
import React from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'

// Import navigations
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Import UI module
import Icon from 'react-native-vector-icons/Ionicons'

// Screen Import
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import StudioScreen from './StudioScreen'
import UploadScreen from './UploadScreen'
import MypageScreen from './MypageScreen'
import LoginScreen from './LoginScreen'
import DetailScreen from './HomeScreen/detail'
import TempSettingScreen from './TempSettingScreen'
import ShoppingScreen from './ShoppingScreen'
// Import functions
import { getUserData, removeUserData, setUserData, storeUserData } from '../Store/actions/authAction'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
  token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  storeUserData: (data) => dispatch(storeUserData(data)),
  signout: () => dispatch(signout())
})


function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown: false}} name="Detail" component={DetailScreen} />
      <Stack.Screen options={{headerShown: false}} name="Shopping" component={ShoppingScreen} />
    </Stack.Navigator>
  )
}

function Settingstack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="SettingScreen" component={SettingScreen} />
      <Stack.Screen  options={{headerShown: false}} name="TempSettingScreen" component={TempSettingScreen} />
    </Stack.Navigator>
  )
}
function MypageStack() {
  return (
    <Stack.Navigator initialRouteName ="MyPage">
      <Stack.Screen options={{headerShown: false}} name="MyPage" component={MypageScreen} />
      <Stack.Screen options={{headerShown: false}} name="Settingstack" component={Settingstack} />
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
          
          if(route.name === 'Home'){
            icon =<Icon name="md-home" size={30} color="black" />
          } else if(route.name === 'Mypage'){
            icon =<Icon name="md-person" size={30} color="black" />
          } else if(route.name === 'Studio'){
            icon =<Icon name="ios-color-filter" size={30} color="black" />
          } else if(route.name === 'Upload'){
            icon =<Icon name="md-arrow-round-up" size={30} color="black" />
          }
          return <Text style={{color: focused && "#46c3ad" || "#888", marginTop: 5}}>{icon}</Text>
          
        }
      })}
      tabBarOptions={{
        activeTintColor: "#FF6787",
        inactiveTintColor: "#888",
      }}
    >
      <Tab.Screen options={{headerShown: false}} name="Home" component={HomeStack} />
      <Tab.Screen options={{headerShown: false}} name="Studio" component={StudioScreen} />
      <Tab.Screen options={{headerShown: false}} name="Upload" component={UploadScreen} />
      <Tab.Screen options={{headerShown: false}} name="Mypage" component={MypageStack} />
    </Tab.Navigator>
  )
}

class RootNavigator extends React.Component {
  constructor (props) {
    super(props)
    // Line for test token
    // removeUserData('userToken')

    // Get token when app starts, if token not exists, go to login page
    getUserData('userToken')
      .then((data) => {
        if(!data) {
          this.props.storeUserData({token: null})
          return
        }
        this.props.storeUserData({token: data})
        this.setState({isLoggedin: data})
      })
      .catch((err) => {
        alert('Failed to login : ', err)
      })
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          {this.props.token === null ? (
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen  options={{headerShown: false}} name="TabStack" component={TabStack} />
          )}
  
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)
