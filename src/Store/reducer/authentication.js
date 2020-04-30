import * as types from '../actions/actionTypes'

const initialState = {
  signin: {
    status: 'INIT',
  },
  token: null
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
      },
      ...action.response
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
  case types.AUTH_STORE_USER_DATA:
    return {
      token: action.response.token
    }
  default:
    return state
  }
}