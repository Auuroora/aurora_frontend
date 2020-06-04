/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import AppNav from './src/Screens'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import configureStore from './src/Store/configureStore'

const store = configureStore()
console.disableYellowBox = true


const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  //TODO: Screens depth 줄이기, Components화 증가
  //TODO: Style Sheet -> 공통부분읜 Styles 폴더 따로, private한 부분은 component 폴더 안에 style로
  return (
    <Provider store={store}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <AppNav/>
    </Provider>
  ) 
}
export default App