/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
class UploadScreen extends Component{

  render(){
    return (
      <View style={styles.container}>
        <Text>UploadScreen</Text>
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

export default UploadScreen