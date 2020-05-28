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

import {
  loadImg,
  onChangeHue,
  onChangeSaturation,
  onChangeLightness,
  onChangeTemperature,
  onChangeVibrance,
  onChangeHighlightHue,
  onChangeHighlightSaturation,
  onChangeShadowHue,
  onChangeShadowSaturation,
  onChangeTint,
  onChangeClarity,
  onChangeBrightnessAndConstrast,
  onChangeExposure,
  onChangeGamma,
  onChangeGrain,
  onChangeVignette,

} from '../../OpencvJs'

const { width } = Dimensions.get('window')

const ImagePickerOptions = {
  title: 'Select Image',
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
      isImageSelected: false
    }
    this.getFilterList()
  }

  getFilterList = async () => {
    const res = await axios.get('/filters', { "user_info": "true" })
    const filterData = res.data
    await this.setState({ filter_list: filterData })
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
    if (type === 'Hue') return onChangeHue
    if (type === 'Saturation') return onChangeSaturation
    if (type === 'Lightness') return onChangeLightness
    if (type === 'Temperature') return onChangeTemperature
    if (type === 'Vibrance') return onChangeVibrance
    if (type === 'HighlightHue') return onChangeHighlightHue
    if (type === 'HighlightSaturation') return onChangeHighlightSaturation
    if (type === 'ShadowHue') return onChangeShadowHue
    if (type === 'ShadowSaturation') return onChangeShadowSaturation
    if (type === 'Tint') return onChangeTint
    if (type === 'Clarity') return onChangeClarity
    if (type === 'BrightnessAndConstrast') return onChangeBrightnessAndConstrast
    if (type === 'Exposure') return onChangeExposure
    if (type === 'Gamma') return onChangeGamma
    if (type === 'Grain') return onChangeGrain
    if (type === 'Vignette') return onChangeVignette
    return () => { console.log(type) }
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
      const modifyFunc = this.mapCvFunction(key)
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
  render() {
    const groupedData = GridRow.groupByRows(this.state.filter_list, 3, () => {
      return 1
    })

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
          data={groupedData}
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
