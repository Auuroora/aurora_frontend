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
  TouchableOpacity,
  Divider
} from '@shoutem/ui'

import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

import { AWS_S3_STORAGE_URL } from "react-native-dotenv"
import axios from "../../axiosConfig"

const { height } = Dimensions.get('window')
class OrderScreen extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)

    this.state = {
      orderCount: 0,
      orderPrice: 2000,
      orderList: [
        {
          "name": "Gaspar Brasserie",
          "address": "185 Sutter St, San Francisco, CA 94109",
          "price": 500,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Chalk Point Kitchen",
          "address": "527 Broome St, New York, NY 10013",
          "price": 500,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "price": 500,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Sushibo",
          "address": "35 Sipes Key, New York, NY 10012",
          "price": 500,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-5.jpg" },
        },
        {
          "name": "Mastergrill",
          "address": "550 Upton Rue, San Francisco, CA 94109",
          "price": 500,
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-6.jpg" },
        }
      ],
    }
  }

  renderRow(orderList) {
    return (
      <View styleName="stretch" style={{ marginHorizontal: 1, marginTop: 5, borderRadius: 2 }}>
        <Row>
          <Image
            style={{ height: height * 0.15, width: height * 0.15 }}
            source={{ uri: orderList.image.url }}
          />
          <View styleName="vertical stretch space-between">
            <Subtitle>{orderList.name}</Subtitle>
            <Subtitle>{orderList.address}</Subtitle>
            <Subtitle>{orderList.price}</Subtitle>
          </View>
          <Button onPress={this.props.onPressRemove}>
            <Text style={{ color: '#0395FF', marginTop: 40, marginRight: 15 }}
            >
              삭제
            </Text>
          </Button>
        </Row>
      </View>
    )
  }

  onClickPayment = () => {
    alert("Payment")
    // this.props.navigation.navigate("Payment")
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
              <Title title={'Order'} topMargin={50} />
            }
          />
        </ImageBackground>
        <ListView
          data={this.state.orderList}
          renderRow={this.renderRow}
        />
        <Divider styleName="line" />
        <Button>
          <Icon
            style={{ color: '#FF6787' }}
            name="plus-button" />
          <Text style={{ color: '#FF6787', fontWeight: "bold" }}>더 담으러 가기</Text>
        </Button>
        <Button styleName="clear"
          style={{
            backgroundColor: '#FF6787',
            height: 50,
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10,
          }}
          onPress={() => {
            this.onClickPayment()
          }}
        >
          <View style={{
            width: 25,
            height: 25,
            borderRadius: 12.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 15,
              fontColor: 'black'
            }}>{this.state.orderList.length}
            </Text>
          </View>
          <Subtitle>  {this.state.orderPrice}원 결제하기</Subtitle>
        </Button>
      </Screen >
    )
  }
}

export default OrderScreen