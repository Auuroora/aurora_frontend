import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Text,
  Spinner
} from '@shoutem/ui'

RightButton.propTypes = {
  onPressNew: PropTypes.func,
  onPressDone: PropTypes.func,
  isNewFilter: PropTypes.bool,
  isUploading: PropTypes.bool
}

const BtnText = {fontSize: 15, color: '#0395FF', marginTop: 10, marginRight: 15}

export default function RightButton (props) {
  if (props.isUploading) {
    return (
      <Spinner
        style={BtnText}
      >

      </Spinner>
    )
  }
  return props.isNewFilter ? 
    (
      <Button onPress={props.onPressDone}>
        <Text
          style={BtnText}
        >
          완료
        </Text>
      </Button>
    ) : 
    (
      <Button onPress={props.onPressNew}>
        <Text
          style={BtnText}
        >
          필터 만들기
        </Text>
      </Button>
    )
}