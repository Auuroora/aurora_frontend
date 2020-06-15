/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import { 
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'

import Tile from '../../Components/Tile'
import PropTypes from 'prop-types'

import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'

class SelectFilterScreen extends Component{
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.state = {
      filter_list: []
    }
  }
  renderRow(rowData) {  
    const cellViews = rowData.map((filter, id) => {
      return (
        <Tile 
          key={id}
          image={AWS_S3_STORAGE_URL + filter.filter_name} 
          filterId={filter.id}
          userId={filter.user_id}
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
    const filter_list = this.props.filterData

    const groupedData = GridRow.groupByRows(filter_list, 3, 
      () => {
        return 1
      })
    
    return (   
      <Screen styleName='fill-parent'
        style={{backgroundColor: '#0A0A0A'}}
      >
        <ListView
          style={{
            listContent: {
              backgroundColor: '#0A0A0A',
            }
          }}
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