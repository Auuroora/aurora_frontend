/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StatusBar
} from 'react-native'
import { 
  ListView,
  GridRow,
  Screen,
  NavigationBar,
} from '@shoutem/ui'
import Title from '../../Components/Title'
import CardItem from '../../Components/CardItem'

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
        <CardItem 
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
    const groupedData = GridRow.groupByRows(item, 2, 
      () => {
        return 1
      })
    return (   
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content"/>
        <NavigationBar
          styleName='inline'
          centerComponent={<Title title={'Filter Select'}/>}
        />
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}

export default MypageScreen