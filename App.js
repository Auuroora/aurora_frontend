/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react'
import AppNav from './src/Screens'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import configureStore from './src/Store/configureStore'

import { Examples } from '@shoutem/ui'
const store = configureStore()

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  //TODO: Screens depth 줄이기, Components화 증가
  //TODO: Style Sheet -> 공통부분읜 Styles 폴더 따로, private한 부분은 component 폴더 안에 style로
  return (
    <Provider store={store}>
      <Examples/>
    </Provider>
  ) 
}

export default App