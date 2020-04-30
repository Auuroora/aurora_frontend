import axios from 'axios'
import {
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAILURE,
  AUTH_SIGNOUT
} from './actionTypes'

axios.defaults.baseURL = 'http://aurora-api.ap-northeast-2.elasticbeanstalk.com'


export function requestSignin(data) {
  return (dispatch) => {
    dispatch(signin())
    return axios.post('/api/auth/signin', data)
      .then((response) => {
        dispatch(signinSuccess(response))
      }).catch((error) => {
        dispatch(signinFailure(error.response.data.code))
      })
  }
}

export function signout() {
  return {
    type: AUTH_SIGNOUT
  }
}

export function signin() {
  return {
    type: AUTH_SIGNIN
  }
}

export function signinSuccess(response) {
  return {
    type: AUTH_SIGNIN_SUCCESS,
    response
  }
}

export function signinFailure(error) {
  return {
    type: AUTH_SIGNIN_FAILURE,
    error
  }
}
