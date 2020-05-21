import React, {Component} from 'react'
import {
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'
import LargeTile from './LargeTile'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import SmallTile from './SmallTile'

import {AWS_S3_STORAGE_URL} from 'react-native-dotenv'

// Import OpenCV Libraries
import {
  loadImg,
  updateTemperature,
  onChangeVignette,
  onChangeGrain,
  onChangeGamma,
  onChangeExposure,
  onChangeClarity,
  onChangeTint,
  onChangeVibrance,
  onChangeValue,
  onChangeSaturation,
  onChangeHue

} from '../../OpencvJs'

/* TODO
 * 1. Add Case for no own filter
 * 2. Add Filter List
 * 3. Add Get all own Filter API call function
 * 4. Add PropTypes
 */

const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

class FilterListScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imageFile : {
        data: null
      },
      filterId :null,
      filter_list: [],
      isImageSelected: false
    }
    this.getFilterList()
  }

  getFilterList = async () => {
    const res = await axios.get('/filters',{"user_info" : "true"})
    const filterData = res.data
    await this.setState({filter_list:filterData}) 
  }

  onChooseFiletoApply = async () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      if (response.error) {
        return
      }
      await this.setState({
        imageFile: response,
        originalFile: response.data,
        isImageSelected: true
      })
    })
  }

  onClickLargeTile = () => {
    this.onChooseFiletoApply()
  }

  mapCvFunction = (type) => {
    if(type === 'Temperature') return updateTemperature
    if(type === 'Tint') return onChangeTint
    if(type === 'Vibrance') return onChangeVibrance
    else return () => {return this.state.imageFile.data}
  }

  onClickFilter = async (filterInfo) => {
    if(!this.state.isImageSelected) {
      alert('이미지를 선택해주세요.')
      return
    }
    const res = await fetch(filterInfo)
    const preset = await res.json()
    let resultImg = null
    loadImg(this.state.originalFile)
    for( let key in preset ) {
      for( let type in preset[key]) {
        const modifyFunc = this.mapCvFunction(type)
        console.log(type)
        try {
          console.log(preset[key][type])
          resultImg = await modifyFunc(preset[key][type])
          this.setState({modifiedFile: resultImg})
        } catch (e) {
          console.log(e)
        }
      }
    }
    await this.setState(prevState => ({
      imageFile: {
        ...prevState.imageFile,
        data: this.state.modifiedFile
      }
    }))
  }
  
  renderRow = (rowData) => {
    const cellViews = rowData.map((filter, id) => {
      return (
        <SmallTile 
          selectFilter={this.onClickFilter}
          key={id}
          filter={AWS_S3_STORAGE_URL + filter.filter_info.filter_data_path}
          image={AWS_S3_STORAGE_URL + filter.filter_info.filter_name} 
          filterId={filter.filter_info.filter_id}
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
    const groupedData = GridRow.groupByRows(this.state.filter_list, 3, 
      () => {
        return 1
      })
    return (
      <Screen>
        <LargeTile
          image={{ uri: 'data:image/jpeg;base64,' + this.state.imageFile.data }}
          onClickTile={this.onClickLargeTile}
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
