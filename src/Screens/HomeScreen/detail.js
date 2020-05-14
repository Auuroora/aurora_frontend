/* eslint-disable react/prop-types */
import React from 'react'

import {
  StatusBar,
  Dimensions
} from 'react-native'

import { 
  Image,
  Screen,
  NavigationBar,
  View,
  Card,
  Icon,
  ListView,
  Heading,
  Subtitle,
  Button,
  Text,
  Divider
} from '@shoutem/ui'

import Title from '../../Components/Title'

const { width } = Dimensions.get('window')

const tagData = ["City","Gray","Bridge","Sad","Building","1999"]

function DetailScreen () {
  const renderTagRow = (data) => {
    return (
      <Button>
        <Text>{data}</Text>
      </Button>
    )
  }
  return (
    <Screen styleName='fill-parent'>
      <StatusBar barStyle="dark-content"/>
      <NavigationBar
        styleName='inline'
        centerComponent={<Title title={'Details'}/>}
        rightComponent={
          <View 
            style={{marginTop: 25}}
            styleName="horizontal space-between">
            <Button>
              <Icon name="cart" />
            </Button>
            <Button>
              <Icon name="take-a-photo" />
            </Button>
          </View>
        }
      />
      <Card 
        style={{width: width}}
        styleName="flexible"
      >
        <Image
          style={{width: width}}
          styleName="large"
          source={{ uri: "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg"  }}
        />
        <View styleName="content">
          <Heading numberOfLines={2}>{"asdf"}</Heading>
          <View styleName="horizontal space-between">
            <Subtitle>Price : {300} $</Subtitle>
            <Button>
              <View styleName="horizontal space-between">
                <Icon name="like"/>
                <Text>  3444</Text>
              </View>
            </Button>
          </View>

          <ListView
            style={{width: '50%'}}
            data={tagData}
            horizontal={true}
            renderRow={renderTagRow}
          />
          <Divider></Divider>
          <View
            style={{flex: 50}}
          >
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
        </View>
      </Card>
    </Screen>
  )
}

export default DetailScreen