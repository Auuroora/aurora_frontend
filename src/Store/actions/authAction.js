import AsyncStorage from '@react-native-community/async-storage'

import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT,
  AUTH_STORE_USER_DATA,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE
} from './actionTypes'

import axios from '../../axiosConfig'

export const removeUserData = async (key) => {
  try {
    await AsyncStorage.removeItem('@Aurora:' + key)
  } catch (e) {
    alert('err : ', e)
  }
}

export const setUserData = async (key, data) => {
  try {
    await AsyncStorage.setItem('@Aurora:' + key, data)
  } catch (e) {
    alert('err : ', e)
  }
}

export const getUserData = async (key) => {
  try {
    const userData = await AsyncStorage.getItem('@Aurora:' + key)
    if(userData === null) {
      return false
    }
    axios.defaults.headers.common['Authorization'] = userData
    return userData
  } catch(e) {
    alert('err : ', e)
  }
}

export const requestSignin = (data) => {
  return (dispatch) => {
    dispatch(signup())
    return axios.post('/auth/login', data)
      .then((response) => {
        setUserData('userToken', response.data.token)
        axios.defaults.headers.common['Authorization'] = response.data.token
        dispatch(signinSuccess())
        dispatch(storeUserData(response.data))
      }).catch((error) => {
        alert('Login Failed : ' + error)
        dispatch(signinFailure(error))
      })
  }
}

export const requestSignup = (data) => {
  return (dispatch) => {
    dispatch(signup())
    return axios.post('/users', data)
      .then(() => {
        dispatch(signupSuccess())
      }).catch((error) => {
        dispatch(signupFailure(error))
      })
  }
}

export const requestSignout = () => {
  return (dispatch) => {
    removeUserData('userToken')
    dispatch(signout())
  }
}

export const signout = () => {
  return {
    type: AUTH_SIGNOUT
  }
}

export const signin = () => {
  return {
    type: AUTH_SIGNIN
  }
}

export const signup = () => {
  return {
    type: AUTH_SIGNUP
  }
}

export const storeUserData = (response) => {
  return {
    type: AUTH_STORE_USER_DATA,
    response
  }
}

export const signupSuccess = () => {
  return {
    type: AUTH_SIGNUP_SUCCESS
  }
}

export const signupFailure = (error) => {
  return {
    type: AUTH_SIGNUP_FAILURE,
    error
  }
}

export const signinSuccess = () => {
  return {
    type: AUTH_SIGNIN_SUCCESS
  }
}

export const signinFailure = (error) => {
  return {
    type: AUTH_SIGNIN_FAILURE,
    error
  }
}
