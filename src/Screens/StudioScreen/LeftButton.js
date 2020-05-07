import React from 'react'

import { 
  View,
  Button,
  Icon
} from '@shoutem/ui'

export default function LeftButton (props) {
  return props.isNewFilter ? 
    (
      <Button onPress={props.onPressCancel}>
        <Icon name="close" />
      </Button>
    ) : 
    (
      <View></View>
    )
}