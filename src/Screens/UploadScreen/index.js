/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StatusBar,
  Dimensions,
  StyleSheet
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
  Subtitle,
  Button,
  View
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
        <View styleName ="horizontal space-between" name = "Title" style ={{ padding :10}}>
          <Subtitle style ={styles.text}>Filter Title</Subtitle>
          <TextInput
            placeholder={'Write Filter Title'}
            style ={{ height: height/10, width :width*0.7}}/>
        </View>
        <View name = "Description" styleName ="horizontal space-between" style ={{padding :10}}>
          <Image
            style ={{ height: height*0.15, width :height*0.15 ,padding :10}}
            source={{ uri:  "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" }}
          />
          <TextInput
            placeholder={'Write Filter Description'}
            style ={{ height: height*0.15, width : width*0.7 }}/>
        </View>
        <View styleName ="horizontal space-between" name = "Tag" style ={{ padding :10}}>
          <Subtitle style ={styles.text}>Filter Tag</Subtitle>
          <TextInput
            placeholder={'Write Filter Tag using #'}
            style ={{ height: height/10, width :width*0.7}}/>
        </View>
        <View styleName ="horizontal space-between" style ={{ padding :5}}>
          <Text style ={styles.text}>FaceBook</Text>
          <Switch 
            style ={{marginBottom: 10, paddingLeft :30}}
            onValueChange={value => this.setState({ Facebook_switchOn: value})}
            value={Facebook_switchOn}
          />          
        </View>
        <View styleName ="horizontal space-between" style ={{padding :5}}>
          <Text style ={styles.text}>Instagram</Text>
          <Switch styleName="disclosure"
            style ={{marginBottom: 10}}
            onValueChange={value => this.setState({ Instagram_switchOn: value})}
            value={Instagram_switchOn}
          />
        </View>

      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color : 'black',
    paddingLeft :10
  }
})

export default UploadScreen