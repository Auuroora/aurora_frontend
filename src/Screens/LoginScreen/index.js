/* eslint-disable react/prop-types */
import React, {Component} from 'react'

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { connect } from 'react-redux'
import { requestSignin } from '../../Store/actions/authAction'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestSignin: (data) => dispatch(requestSignin(data))
})

class LoginScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      emailInput: '',
      pwInput: ''
    }
    // TODO: input validation 필요
  }

  onClickSignIn = async () => {
    const data = {
      email: this.state.emailInput,
      password: this.state.pwInput
    }
    await this.props.requestSignin(data)
    console.log(this.props.token)
  }

  render(){
    //TODO: TextInput 설정 - 비밀번호 가리기, 첫 대문자 비활성화
    return (
      <View style={styles.container}>
        <View style={styles.titleArea}>
          <Text style={styles.title}>Aurora</Text>
        </View>
        <View style={styles.formArea}>
          <TextInput 
            style={styles.textForm} 
            placeholder={"Email"}
            onChange={(input) => this.setState({emailInput: input})}
          />
          <TextInput 
            style={styles.textForm} 
            placeholder={"Password"}
            onChange={(input) => this.setState({pwInput: input})}
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              this.onClickSignIn()
            }}>
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    justifyContent: 'center',
  },
  titleArea: {
    width: '100%',
    padding: wp('10%'),
    alignItems: 'center',
  },
  title: {
    fontSize: wp('10%'),
  },
  formArea: {
    width: '100%',
    paddingBottom: wp('10%'),
  },
  textForm: {
    borderWidth: 0.5,
    borderColor: '#888',
    width: '100%',
    height: hp('5%'),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  buttonArea: {
    width: '100%',
    height: hp('5%'),
  },
  button: {
    backgroundColor: "#e75d7b",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
  }
})