import React from 'react'

import { Heading } from '@shoutem/ui'
import PropTypes from 'prop-types'

Title.propTypes = {
  title: PropTypes.string,
  topMargin: PropTypes.number
}

export default function Title (props) {
  let margin = props.topMargin ? props.topMargin : 25
  margin =  margin + '%'
  return (
    <Heading
      style={{marginTop: margin, fontWeight: 'bold', fontSize: 25}}
    >
      {props.title}
    </Heading>  
  )
}