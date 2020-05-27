import React, { Component } from 'react'
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
  View,
  Button,
  Text,
  TouchableOpacity
} from '@shoutem/ui'

import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"


const { height } = Dimensions.get('window')
class ShoppingScreen extends Component {
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
      <View styleName="stretch" style={{ marginHorizontal: 1, marginTop: 5, borderRadius: 2 }}>
        <Row>
          <Image
            style={{ height: height * 0.15, width: height * 0.15 }}
            source={{ uri: restaurant.image.url }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle>{restaurant.name}</Subtitle>
            <Subtitle>{restaurant.address}</Subtitle>
          </View>
          <Icon styleName="disclosure" name="checkbox-off" />
        </Row>
      </View>
    )
  }

  onClickOrder = () => {
    this.props.navigation.navigate("Order")
  }

  render() {
    return (
      <Screen styleName='fill-parent'>
        <ImageBackground
          source={{ uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941' }}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'Shopping'} topMargin={50} />
            }
          />
        </ImageBackground>
        <ListView
          data={this.state.restaurants}
          renderRow={this.renderRow}
        />
        <Button styleName="clear"
          style={{
            backgroundColor: '#FF6787',
            height: 50,
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            this.onClickOrder()
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontColor: 'black'
            }}>담은 목록(x개) 구매하러가기</Text>
        </Button>
      </Screen>
    )
  }
}

export default ShoppingScreen
