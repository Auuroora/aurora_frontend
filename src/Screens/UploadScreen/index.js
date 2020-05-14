/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

/* TODO
 * 1. 자기 소유의 필터목록을 보여줌 -> 샘플데이터로
 * 2. 폼 작성 - title description user_id filter_id price tag_list
 * 3. API Server에 업로드
 */

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