/* eslint-disable react/prop-types */
import React from 'react'
import {
  Text,
  StyleSheet,
  Image,
} from 'react-native'

import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Card, CardItem, Thumbnail, Body, Left, Button, Icon } from 'native-base'

const DetailScreen = ({route}) => {
  const {imgId} = route.params
  const img ={
    '1' : require('../../assets/image/img.jpg'),
    '2' : require('../../assets/image/img2.jpg')
  }
  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail source={require('../../assets/image/writer.jpg')} />
          <Body>
            <Text>작가이름</Text>
            <Text note>#카페 #감성</Text>
            <Text note>$1000</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Image source={img[imgId]} style={{height:300, width:300, flex:1, resizeMode:'contain'}}/>
      </CardItem>
      <CardItem style={{ height:20 }}>
        <Left>
          <Button transparent>
            <Icon name='ios-heart' style={{ color:'black' }}/>
          </Button>
          <Text>likes</Text>
        </Left>
      </CardItem>
      <CardItem>
        <Text>설명글.........! ..이건.. 디테일할때 서버에서 받아와야하나홍홍.</Text>
      </CardItem>
    </Card>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textForm: {
    fontSize: wp('5%'),
  },
})

export default DetailScreen