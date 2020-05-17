import React, {Component} from 'react'
import {
  StatusBar,
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Button,
  Icon,
  GridRow
} from '@shoutem/ui'
import CardItem from '../../Components/CardItem'
import Title from '../../Components/Title'

/* TODO
 * 1. Add SearchBar and icon to Navigation
 * 2. Add Sort and icon to Navigation
 * 3. Add function for go to Detail page
 * 4. Add detail page
 */

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
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-2.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Kyoto Amber Upper East",
          "address": "225 Mulberry St, New York, NY 10012",
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
        }
      ],
    }
  }

  renderRow(rowData) {  
    const cellViews = rowData.map((restaurant, id) => {
      return (
        <CardItem
          navigation={this.props.navigation}
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
  onClickShopping = () =>{
    this.props.navigation.navigate("Shopping")
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
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content" hidden = {true}/>
        <ImageBackground
          source={{uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            centerComponent={
              <Title title={'Home'} topMargin={50}/>
            }
            rightComponent={
              <Button onPress={() => {this.onClickShopping()}}>
                <Icon name="cart" />
              </Button>
            }
          />
        </ImageBackground>
        <ListView
          styleName='inline'
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}

export default HomeScreen