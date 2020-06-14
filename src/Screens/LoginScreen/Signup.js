/* eslint-disable react/prop-types */
import React, {Component} from 'react'

import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import {
  TextInput,
  Text,
  Image,
  Heading
} from '@shoutem/ui'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

import { connect } from 'react-redux'
import { requestSignup } from '../../Store/actions/authAction'
import { selectImage, uploadImageToS3 } from '../../utils'

const mapDispatchToProps = (dispatch) => ({
  requestSignup: (data) => dispatch(requestSignup(data))
})

class Signup extends Component{
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      image: ''
    }
  }

  onClickProfile = async () => {
    let image = await selectImage()
    console.log(image)
    this.setState({image: 'data:image/jpeg;base64,' + image.data})
  }

  onClickSignUp = async () => {
    try {
      const key = await uploadImageToS3(this.state.image)

      const data = {
        email: this.state.email,
        image: key,
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }

      await this.props.requestSignup(data)
      alert('회원가입에 성공하였습니다!')
      this.props.navigation.goBack(null)
    } catch (e) {
      alert('error' + e)
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Heading>
            회원 가입
          </Heading>
        </View>
        <View style={styles.formArea}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={this.onClickProfile}>
              <Image
                styleName="medium-avatar"
                style={styles.avatar}
                source={{ 
                  uri: this.state.image ? this.state.image : 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'
                }}
              />
            </TouchableOpacity>
            <Text style={styles.avatarLabel}>
                프로필 사진 등록
            </Text>
          </View>
          <TextInput 
            placeholder={"이메일"}
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />          
          <TextInput 
            placeholder={"이름"}
            value={this.state.username}
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput 
            placeholder={"비밀 번호"}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput 
            placeholder={"비밀 번호 재입력"}
            value={this.state.passwordConfirmation}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({passwordConfirmation: text})}
          />
        </View>
        <View style={styles.buttonArea}>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.onClickSignUp}>
            <Text style={styles.buttonTitle}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(Signup)

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp('10%')
  },
  avatarLabel: {
    marginTop: wp('3%')
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: wp('10%'),
    paddingRight: wp('10%'),
    justifyContent: 'center'
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
    paddingBottom: wp('10%')
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
    marginTop: 10
  },
  buttonTitle: {
    color: 'white',
  }
})