import React, {Component} from 'react'
import {
  Dimensions
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Row,
  Subtitle,
  Icon,
  Image,
  View
} from '@shoutem/ui'

import Title from '../../Components/Title'

/* TODO
 * 1. 장바구니에 담긴 리스트 자료 api로 요청 후 보여주기
 * 2. +버튼 누를 경우, 결제 api호출
 */

const { height } = Dimensions.get('window')
class ShoppingScreen extends Component{
  constructor(props) {
    super(props)
  
    this.renderRow = this.renderRow.bind(this)
  
    this.state = {
      restaurants: [
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Mastergrill",
          "address": "550 Upton Rue, San Francisco, CA 94109",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
        }
      ],
    }
  }
  renderRow(restaurant) {
    return (
      <View styleName="stretch" style={{marginHorizontal: 1, marginTop: 5, borderRadius: 2}}>
        <Row>  
          <Image
            style ={{ height: height*0.15, width :height*0.15}}
            source={{ uri: restaurant.image.url }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle>{restaurant.name}</Subtitle>
            <Subtitle>{restaurant.address}</Subtitle>
          </View>
          <Icon styleName="disclosure" name="plus-button" />
        </Row>
      </View>
    )
  }
  
  render(){
    return (
      <Screen styleName='fill-parent'>
        <ImageBackground
          source={{uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'Shopping'} topMargin={50}/>
            }
          />
        </ImageBackground>    
        <ListView
          data={this.state.restaurants}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}

export default ShoppingScreen