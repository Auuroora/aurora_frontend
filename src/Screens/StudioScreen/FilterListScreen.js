import React from 'react'
import {
  View,
  Heading
} from '@shoutem/ui'
import LargeTile from './LargeTile'

/* TODO
 * 1. Add Case for no own filter
 * 2. Add Filter List
 * 3. Add Get all own Filter API call function
 * 4. Add PropTypes
 */

export default function FilterListScreen (props) {
  return (
    <View>
      <LargeTile
        image={'https://shoutem.github.io/static/getting-started/restaurant-1.jpg'}
      ></LargeTile>
      <Heading>List</Heading>
    </View>
  )
}