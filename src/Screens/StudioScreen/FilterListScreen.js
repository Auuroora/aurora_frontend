import React, {Component} from 'react'
import {
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'
import LargeTile from './LargeTile'
import axios from '../../axiosConfig'

const base_url ="https://aurora-filter-storage.s3.ap-northeast-2.amazonaws.com/"

/* TODO
 * 1. Add Case for no own filter
 * 2. Add Filter List
 * 3. Add Get all own Filter API call function
 * 4. Add PropTypes
 */

// import Tile from '../../Components/Tile'
import SmallTile from './SmallTile'
class FilterListScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      img :'https://shoutem.github.io/static/getting-started/restaurant-1.jpg',
      filterId :'',
      filter_list: []
    } 
  }
  onPressDone(){
    alert("CC")
    this.setState({
      filterId: 1,
      img: ''
    })
  }
  renderRow(rowData) {  
    const cellViews = rowData.map((filter, id) => {
      return (
        <SmallTile 
          key={id}
          image={base_url + filter.filter_info.filter_name} 
          filterId={filter.filter_info.filter_id}
          onPressDone ={this.onPressDone} 
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
    const filter_list = this.state.filter_list
    const groupedData = GridRow.groupByRows(filter_list, 3, 
      () => {
        return 1
      })
    
    return (
      <Screen>
        <LargeTile
          image={this.state.img}
        ></LargeTile>
        <Screen styleName='fill-parent'>
          <ListView
            data={groupedData}
            renderRow={this.renderRow}
          />
        </Screen>
      </Screen>
    )
  }
}
export default FilterListScreen
