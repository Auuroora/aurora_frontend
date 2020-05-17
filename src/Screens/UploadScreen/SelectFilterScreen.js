/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import { 
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'
import Tile from './Tile'
import PropTypes from 'prop-types'

class SelectFilterScreen extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      item: [
        {
          "name": "Gaspar Brasserie",
          "filterId": 1,
          "price": "$150",
          "image": { "url": "https://shoutem.github.io/static/getting-started/restaurant-1.jpg" },
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "filterId": 2,
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-2.png"},
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "filterId": 3,
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-11.png" },
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "filterId": 4,
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" },
        },
        {
          "name": "Gaspar Brasserie",
          "price": "$150",
          "filterId": 1,
          "image": { "url": "https://shoutem.github.io/img/ui-toolkit/examples/image-2.png"},
        }
      ]
    }
  }
  renderRow(rowData) {  
    const cellViews = rowData.map((item, id) => {
      return (
        <Tile 
          key={id}
          image={item.image.url} 
          filterId={item.filterId}
          onPressDone ={this.props.onPressDone} 
        />
      )
    })
    return (
      <GridRow columns={3}>
        {cellViews}
      </GridRow>
    )
  }

  render(){
    const item = this.state.item
    const groupedData = GridRow.groupByRows(item, 3, 
      () => {
        return 1
      })
    return (   
      <Screen styleName='fill-parent'>
        <ListView
          data={groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}
SelectFilterScreen.propTypes = {
  isSelectFilter: PropTypes.number,
  onPressDone: PropTypes.func
}

export default SelectFilterScreen