import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

import PropTypes from 'prop-types'

SomethingScreen.propTypes = {
  tintColor: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default class SomethingScreen extends Component{

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