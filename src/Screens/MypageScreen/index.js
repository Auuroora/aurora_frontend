/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
} from 'react-native'

import Profile from './Profile'
import Grid from './Grid'
import { 
  
  NavigationBar,
  Title,
  ImageBackground,
  View,
  ListView,
  GridRow,
  Screen,
  Subtitle,
  Divider,
  Tile,
  Heading
} from '@shoutem/ui'
class MypageScreen extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      restaurants: [
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-2.png"},
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-11.png" },
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" },
        },
      ]
    }
  }
  renderRow(rowData) {  
    const cellViews = rowData.map((restaurant, id) => {
      return (
        <Grid 
          key={id}
          image={restaurant.image.url} 
          title={restaurant.name} 
          price={restaurant.price}
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
      <Screen style={styles.my_container}>
        <Screen stylename = "fill-parent">
          <Profile navigation={this.props.navigation}></Profile>
        </Screen>
        <Screen styleName="page">
          <ListView
            styleName='v-center'
            data={groupedData}
            renderRow={this.renderRow}
          />
        </Screen>
      </Screen>
    )
  }
}
const styles = StyleSheet.create({
  my_container: {
    flex: 1,
  },
  profile_container:{
    flex: 1,
  },
  card_container:{
    flex: 3,
  },
})

export default MypageScreen