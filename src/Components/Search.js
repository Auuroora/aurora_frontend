/* eslint-disable react/prop-types */
import React from 'react'
import {
  TextInput,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
const Search = () => {
  return(
    <View style={styles.SearchdContainer}>
      <Icon
        name='md-search'
        color='#000'
        size={30}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={"입력"}
      />
    </View>
  )
}
const styles ={
  SearchdContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
}
// filter하는 로직 필요..
function SearchFilterFunction(text){

}
export default Search