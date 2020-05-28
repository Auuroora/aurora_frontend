import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { 
  Icon,
  Button
} from '@shoutem/ui'

export default class Comments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text  style={styles.name}>{this.props.name}</Text>
            <View style={styles.contentHeader}>
              <Text style={styles.time}>
                    9:58 am
              </Text>
            </View>
          </View>
          <Text 
            rkType='primary3 mediumLine'
            style={styles.comment}
          >{this.props.comment}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  comment:{  
    fontSize:15,
    color:"#808080",
    marginLeft:15
  },
  name:{
    fontSize:16,
    color:'white',
    fontWeight:"bold",
  },
})  