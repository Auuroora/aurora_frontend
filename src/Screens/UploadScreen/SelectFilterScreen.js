/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import { 
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'
import Tile from './Tile'
import PropTypes from 'prop-types'
import axios from '../../axiosConfig'

const base_url ="https://aurora-filter-storage.s3.ap-northeast-2.amazonaws.com/"

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
      // console.log(filter)
      return (
        <Tile 
          key={id}
          image={base_url + filter.filter_info.filter_name} 
          filterId={filter.filter_info.filter_id}
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
    axios.get('/filters',{"user_info" : "true"}).then(res => {
      const filterData = res.data
      this.setState({filter_list:filterData}) 
    })
    
    // res = await axios.post('/filters', data)
    const filter_list = this.state.filter_list
    // console.log(filter_list)
    const groupedData = GridRow.groupByRows(filter_list, 3, 
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