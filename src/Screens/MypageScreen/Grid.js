import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { 
  View,
  Card,
  Image,
  Subtitle,
  ImageBackground,
  Caption,
  Tile,
  Overlay,
  Heading,
  Title,
  Button,
  Icon,
  Text
  
} from '@shoutem/ui'

Grid.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  tempData: PropTypes.string
}

export default function Grid (props) {
  return (
    <TouchableOpacity>
      <Card styleName="flexible">
        <Tile styleName="small">
          <Image
            styleName="medium-square"
            source={{ uri: props.image }}
          />
          <Subtitle numberOfLines={2}>{props.title}</Subtitle>
          <View styleName="horizontal space-between">
            <Caption>{props.price}</Caption>
            <Icon name = "like"/>
          </View>
        </Tile>
      </Card>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
})