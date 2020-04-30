import * as types from '../actions/actionTypes'

const initialState = {
  signin: {
    status: 'INIT',
  },
  status: {
    token: '',
    isLoggedIn: false,
    userName: '',
    isAdminUser: false
  }
}

export default function authentication(state = initialState, action) {
  switch(action.type) {
  case types.AUTH_SIGNIN:
    return {
      ...state,
      signin: {
        status: 'WAITING'
      }
    }
  case types.AUTH_SIGNIN_SUCCESS:
    return {
      ...state,
      signin: {
        ...state.signin,
        status: 'SUCCESS'
      }
    }
  case types.AUTH_SIGNIN_FAILURE:
    return {
      ...state,
      signin:{
        status: 'FAILURE'
      }
    }
  case types.AUTH_SIGNOUT:
    return {
      ...initialState
    }
  case types.SET_USER_DATA:
    return {
      ...state,
      status: {
        isLoggedIn: action.isLoggedIn,
        userName: action.name,
        token: action.token,
        isAdminUser: action.admin
      }
    }
  default:
    return state
  }
}