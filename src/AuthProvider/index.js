import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

export const AuthContext = React.createContext()


export default class AuthProvider extends Component {
    state = {
      token: '',
      saveToken: async () => {
        try {
          const resp = await AsyncStorage.setItem('userToken', 'abc')
          return resp
        }
        catch (error) {
          this.setState({ error })
        }

      },
      removeToken: async () => {
        try {
          const resp = await AsyncStorage.removeItem('userToken')
          return resp
        }
        catch (error) {
          this.setState({ error })
        }
      },
      getToken: async () => {
        try {
          const resp = await AsyncStorage.getItem('userToken')
          return resp
        }
        catch (error) {
          this.setState({ error })
        }
      }

    }

    componentWillMount() {
      AsyncStorage.getItem('userToken')
        .then((token) => {
          this.setState({ token })
        })
        .catch(error => {
          this.setState({ error })
        })
    }

    render() {
      return (
        <AuthContext.Provider value={this.state}>
          {this.props.children}
        </AuthContext.Provider>
      )
    }
}