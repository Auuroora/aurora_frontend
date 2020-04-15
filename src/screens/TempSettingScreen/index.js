/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

class TempSettingScreen extends Component{

  render(){
    return (
      <View style={styles.container}>
        <Text>something</Text>
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

export default TempSettingScreen