import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
 
import { Card, CardItem, Thumbnail, Body, Left, Button, Icon } from 'native-base'
class CardCompnent extends Component{
  render(){
    const images = {
      '1': require('../image/img.jpg'),
      '2': require('../image/img2.jpg'),
    }

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../image/writer.jpg')} />
            <Body>
              <Text>작가이름</Text>
              <Text note>#카페 #감성</Text>
              <Text note>$1000</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          {/* <Image source={require('../image/img.jpg')} style={{height:150, width:null, flex:1, resizeMode:'contain'}}/> */}
          <Image source={images[this.props.imageSource]} style={{height:150, width:null, flex:1, resizeMode:'contain'}}/>
        </CardItem>
        <CardItem style={{ height:20 }}>
          <Left>
            <Button transparent>
              <Icon name='ios-heart' style={{ color:'black' }}/>
            </Button>
            <Text>{this.props.likes} likes</Text>
          </Left>
        </CardItem>
      </Card>
    )
  }
}
export default CardCompnent
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
