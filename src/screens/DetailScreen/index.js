/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'
export default class DetailScreen extends Component{
    static navigationOptions = {
      header: null,
    };
    render(){
      return (
        <View style={styles.container}>
          <Text>detail</Text>
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