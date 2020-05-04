/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StyleSheet,
} from 'react-native'

import Profile from './Profile'
import Grid from './Grid'
import { 
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'
class MypageScreen extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      item: [
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
    const cellViews = rowData.map((item, id) => {
      return (
        <Grid 
          key={id}
          image={item.image.url} 
          title={item.name} 
          price={item.price}
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
    const item = this.state.item
    // groupByRows(data, column number, grouping number)
    const groupedData = GridRow.groupByRows(item, 2, 
      () => {
        return 1
      })
    return (   
      <Screen style={styles.my_container}>
        <Screen style={styles.profile_container}>
          <Profile navigation={this.props.navigation}></Profile>
        </Screen>
        <Screen style={styles.card_container}>
          <ListView
            styleName='inline'
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
    flex: 2,
  },
  card_container:{
    flex: 4,
  },
})

export default MypageScreen