import React, {Component} from 'react'
import {
  StatusBar,
} from 'react-native'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  GridRow
} from '@shoutem/ui'
import Title from '../../Components/Title'

class ShoppingScreen extends Component{
  render(){
    return (
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

export default ShoppingScreen