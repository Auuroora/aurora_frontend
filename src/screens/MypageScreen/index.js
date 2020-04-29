/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
class MypageScreen extends Component{
  render(){
    return (        
      <View style={styles.container}>    
        <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Settingstack')}}>
          <Icon
            name='md-menu'
            color='#000'
            size={30}
          />
        </TouchableOpacity>
        <Text>Mypage</Text>
        <Button
          title='back'
          onPress={() => this.props.navigation.goBack()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MypageScreen