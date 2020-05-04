import React, {Component} from 'react'
import {
  StatusBar,
  TouchableOpacity,

} from 'react-native'
import { 
  
  NavigationBar,
  Title,
  ImageBackground,
  View,
  ListView,
  GridRow,
  Subtitle,
  Divider,
  Tile,
  Heading
} from '@shoutem/ui'
import CardItem from './CardItem'

class HomeScreen extends Component{
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
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-3.jpg" },
        }
      ],
    }
  }
  renderRow(rowData) {  
    const cellViews = rowData.map((restaurant, id) => {
      return (
        <CardItem 
          key={id}
          image={restaurant.image.url} 
          title={restaurant.name} 
          tempData={restaurant.address}
        />
      )
    })
    return (
      <GridRow columns={2}>
        {cellViews}
      </GridRow>
    )
  }
  render(){
    const restaurants = this.state.restaurants
    // groupByRows(data, column number, grouping number)
    const groupedData = GridRow.groupByRows(restaurants, 2, 
      () => {
        return 1
      })
    return (
      //TODO: 무한 스크롤 적용해야함 
      //TODO: Component 로 뽑아내기
      <View styleName='fill-parent'>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground
          source={{uri: 'http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg'}}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Heading
                style={{marginTop: '50%'}}
              >
                TITLE
              </Heading>
            }
          />
        </ImageBackground>
        <ListView
          styleName='inline'
          data={groupedData}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

export default HomeScreen