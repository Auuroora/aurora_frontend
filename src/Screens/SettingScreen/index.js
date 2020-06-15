/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'

import { 
  StackActions
} from '@react-navigation/native'

import {
  View,
  Screen,
  NavigationBar
} from '@shoutem/ui'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { connect } from 'react-redux'

import Title from '../../Components/Title'
import { requestSignout } from '../../Store/actions/authAction'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestSignout: () => dispatch(requestSignout())
})

class SettingScreen extends Component{
  _checkLogout = async () => {
    this.props.requestSignout()
    alert('로그아웃 되었습니다.')
  }

  render(){
    return (
      <Screen 
        style={styles.container}
      >
        <NavigationBar
          styleName='inline clear'
          centerComponent={<Title title={'Studio'}/>}
        />
        <TouchableOpacity 
          style={styles.wrapButton}
          onPress={this._checkLogout.bind(this)}>
          <Text style={styles.menuText}>🔓 Logout</Text>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E'
  },
  wrapButton: {
    width: wp('100%'),
    height: hp('8%'),
    paddingLeft: wp('8%'),
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  menuText: {
    color: '#FAFAFA',
    fontSize: 20
  }
})