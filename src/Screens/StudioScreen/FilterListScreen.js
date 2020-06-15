import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet
} from 'react-native'

import {
  ListView,
  GridRow,
  Screen,
} from '@shoutem/ui'

import LargeTile from './LargeTile'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import SmallTile from './SmallTile'

import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import { loadImg } from '../../OpencvJs'
import { mapCvFunction, saveImage } from '../../utils'

const { width } = Dimensions.get('window')

const ImagePickerOptions = {
  title: 'Select Image',
  customButtons: [{ name: 'fb', title: '저장하기' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

class FilterListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: {
        data: null
      },
      filterId: null,
      filter_list: [],
      isImageSelected: false,
      groupedData: null
    }
    
    this.getFilterList()
  }

  getFilterList = async () => {
    const res = await axios.get('/myfilter', { "user_info": "true" })
    let filterData = res.data.my_filter
    filterData = filterData.concat(res.data.purchase_filter)
    await this.setState({ filter_list: filterData })

    const groupedData = GridRow.groupByRows(this.state.filter_list, 3, () => {
      return 1
    })

    await this.setState({ groupedData: groupedData })

    console.log(this.state.filter_list)
  }

  onChooseFiletoApply = async () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      else if (response.error) {
        return
      }
      else if (response.customButton) {
        if (!this.state.isImageSelected || !this.state.imageFile) {
          alert('먼저 이미지를 선택해주세요.')
          return
        }
        await saveImage('data:image/jpeg;base64,' + this.state.imageFile.data)
        alert('이미지가 저장되었습니다.')
      }
      else {
        await this.setState({
          imageFile: response,
          originalFile: response.data,
          isImageSelected: true
        })
      }
    })
  }

  onClickLargeTile = () => {
    this.onChooseFiletoApply()
  }

  onClickFilter = async (filterInfo) => {
    if (!this.state.isImageSelected) {
      alert('이미지를 선택해주세요.')
      return
    }
    const res = await fetch(filterInfo)
    const preset = await res.json()
    let resultImg = null

    const imageDownSizeWidth = width
    const imageDownSizeHeight = this.state.imageFile.height * (width / this.state.imageFile.width)

    loadImg(this.state.originalFile, imageDownSizeWidth, imageDownSizeHeight)

    for (let key in preset) {
      const modifyFunc = mapCvFunction(key)
      try {
        resultImg = await modifyFunc(preset[key])
        this.setState({ modifiedFile: resultImg })
      } catch (e) {
        console.log(e)
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
          filter={AWS_S3_STORAGE_URL + filter.filter_data_path}
          image={AWS_S3_STORAGE_URL + filter.filter_name}
          filterId={filter.filter_id}
        />
      )
    })
    return (
      <GridRow columns={3}>
        {cellViews}
      </GridRow>
    )
  }
  render() {

    return (
      <Screen style={styles.darkScreen}>
        <LargeTile
          image={this.state.imageFile.data}
          onClickTile={this.onClickLargeTile}
        ></LargeTile>
        <ListView
          style={{
            listContent: {
              backgroundColor: '#0A0A0A'
            }
          }}
          onRefresh={() => this.getFilterList()}
          data={this.state.groupedData}
          renderRow={this.renderRow}
        />
      </Screen>
    )
  }
}
export default FilterListScreen


const styles = StyleSheet.create({
  darkScreen: {
    backgroundColor: '#0A0A0A'
  }
})  
