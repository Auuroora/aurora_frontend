import React, { Component } from 'react'
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native'

const Item = ({num}) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
      <Text style={styles.text}>{num}</Text>
      <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
    </View>
  )
}
const arr = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}
const data = [
  {
    id: 1,
    uri: 'https://i.ytimg.com/vi/ZYvvmsrDOj8/maxresdefault.jpg'
  },
  {
    id: 2,
    uri: 'https://i.ytimg.com/vi/ZYvvmsrDOj8/maxresdefault.jpg'
  },
  {
    id: 3,
    uri: 'https://i.ytimg.com/vi/ZYvvmsrDOj8/maxresdefault.jpg'
  },
  {
    id: 4,
    uri: 'https://i.ytimg.com/vi/ZYvvmsrDOj8/maxresdefault.jpg'
  }
]
class ProfileBody extends Component{
  static defaultProps = {
    numColumns: 1,
    items: ''
  }
  constructor() {
    super()
    this.state = {
      dataSource: {},
    }
  }
  render(){
    return (
      <View >
        <FlatList 
          data={data}
          ListHeaderComponent={()=>
            <View style={styles.header}>
              <Text style={styles.headerText}>Header</Text>
            </View>
          }
          renderItem={({ item })=>
            <Image style={styles.image} source={{ uri: item.uri }} />
          }
          columnWrapperStyle={styles.imageRow}
          numColumns={3}
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
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
})
export default ProfileBody