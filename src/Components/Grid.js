import React, { Component } from 'react'
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text
} from 'react-native'
class ProfileBody extends Component{
  static defaultProps = {
    numColumns: 1,
    dataSource: ''
  }
  render(){
    return (
      <View >
        <FlatList 
          data={this.props.item}
          renderItem={({item, index})=>
            <Image style={styles.photo} source={require('../assets/image/img.jpg')} />
          }

          columnWrapperStyle={styles.imageRow}
          numColumns={this.props.numColumns}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    paddingTop: 30,
  },
  container: {
    borderBottomWidth: 1,
    height: 100,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 50,
  },
  photo: {
    height:150, 
    width:null, 
    flex:1, 
    resizeMode:'contain'
  },
})
export default ProfileBody