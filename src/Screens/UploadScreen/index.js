/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StatusBar,
  Dimensions
} from 'react-native'
import { 
  NavigationBar,
  TextInput,
  ImageBackground,
  Screen,
  Switch,
  Row,
  Icon,
  Text,
  Image,
  Caption,
  Divider,
  Subtitle,
  Button
} from '@shoutem/ui'

import Title from '../../Components/Title'
const { width, height } = Dimensions.get('window')

/*
title
description
user_id
filter_id
price
tag_list
 */
class UploadScreen extends Component{
  constructor() {
    super()
    this.state = {
      Facebook_switchOn: false,
      Instagram_switchOn: false,
    }
  }
  render(){
    
    const { Facebook_switchOn,Instagram_switchOn } = this.state
    return (
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground
          source={{uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <Button>
                <Icon name="left-arrow" />
              </Button>
            }
            centerComponent={
              <Title title={'Upload'} topMargin={50}/>
            }
            
            rightComponent={
              <Button>
                <Icon name="share" />
              </Button>
            }
          />
        </ImageBackground>

      </Screen>
    )
  }
}

export default UploadScreen