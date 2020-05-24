import React from 'react'
import PropTypes from 'prop-types'

import {Dimensions} from 'react-native'

// Import UI Modules
import Slider from '@react-native-community/slider'
import {
  Image,
  View,
  Spinner,
  ListView,
  Screen
} from '@shoutem/ui'
import FilterTile from './FilterTile'

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

const { width, height } = Dimensions.get('window')

export default class NewFilterScreen extends React.Component {
  static propTypes = {
    image: PropTypes.object,
    onNewFilterDone: PropTypes.func,
    isDone: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      image: props.image,
      isImageLoaded: false,
      editValue: {
        Color: {
          Temperature: 0,
          Saturation: 0,
          Tint: 0,
          Hue: 0
        },
        Brightness: {
          Vignette: 0,
          asdf: 0,
          Gamma: 100,
          Exposure: 0,
          Value: 0,
        },
        Etc: {
          Grain: 0,
          Clarity: 0,
          Vibrance: 0
        }
      },
      editValueRange: {
        Temperature: { min: -100, max : 100 },
        Saturation: { min: -100, max : 100 },
        Tint: { min: -100, max : 100 },
        Hue: { min: -100, max : 100 },
        Vignette: { min: -100, max : 100 },
        asdf: { min: -100, max : 100 },
        Gamma: { min: 1, max : 200 },
        Exposure: { min: -100, max : 100 },
        Value: { min: -100, max : 100 },
        Grain: { min: 0, max : 100 },
        Clarity: { min: -100, max : 100 },
        Vibrance: { min: -100, max : 100 }
      },
      selectedCategory: null,
      selectedValue: null,
      selectedValueRange: null,
      sliderValue: null,
      editFunction: null,
    }

    const imageDownSizeWidth = width
    const imageDownSizeHeight = this.state.image.height * (width / this.state.image.width)

    loadImg(this.state.image.data, imageDownSizeWidth, imageDownSizeHeight)
      .then(() => {
        this.setState({isImageLoaded: true})
      })
      .catch((err) => {
        console.log(err)
      })

  }

  mapCvFunction = (type) => {
    if(type === 'Saturation') return onChangeSaturation
    if(type === 'Temperature') return updateTemperature
    if(type === 'Vignette') return onChangeVignette
    if(type === 'Grain') return onChangeGrain
    if(type === 'Gamma') return onChangeGamma
    if(type === 'Exposure') return onChangeExposure
    if(type === 'Clarity') return onChangeClarity
    if(type === 'Tint') return onChangeTint
    if(type === 'Vibrance') return onChangeVibrance
    if(type === 'Value') return onChangeValue
    if(type === 'Saturation') return onChangeSaturation
    if(type === 'Hue') return onChangeHue
  }

  // User Event for image operation
  onChangeSliderValue = async (val) => {
    this.setState(prevState => ({
      editValue: {
        ...prevState.editValue,
        [this.state.selectedCategory]: {
          ...this.state.editValue[this.state.selectedCategory],
          [this.state.selectedValue]: val
        },
      }
    }))
    try {
      const resultImg = await this.state.editFunction(val)
      this.setState({ 
        image: {
          data: resultImg
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  onPressCategoryTile = (val) => {
    this.setState({selectedCategory: val})
    this.setState({selectedValue: null})
  }

  onPressValueTile = async (val) => {
    const selectedValueTile = this.state.editValue[this.state.selectedCategory][val]
    
    await this.setState({
      selectedValue: val,
      sliderValue: selectedValueTile,
      editFunction: this.mapCvFunction(val),
      selectedValueRange: this.state.editValueRange[val],
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isDone !== this.props.isDone && this.props.isDone) {
      this.props.onNewFilterDone(this.state.image.data, this.state.editValue)
      // TODO: close and reset all variables
    }
  }

  // For Rendering Image View
  bindImageView = () => {
    if (this.state.isImageLoaded) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.state.image.data }}
          styleName='large'
        />
      )
    }
    return (
      <Spinner styleName='large'/>
    )
  }
  // For Rendering Category Tile
  renderCategoryRow = (data) => {
    return (
      <FilterTile
        title={data}
        key={data.key}
        onPressTile={this.onPressCategoryTile.bind(this)}
        size={'medium'}
        style={{borderRadius: 20}}
        image={require('../../assets/image/Header.jpg')}
      />
    )
  }
  // For Rendering Value Tile
  renderRow = (data) => {
    return (
      <FilterTile
        onPressTile={this.onPressValueTile.bind(this)}
        title={data}
        size={'small'}
        image={require('../../assets/image/Header.jpg')}
      />
    )
  }
  
  render () {
    let imageView = this.bindImageView()
    return (
      <Screen
        style={{
          flex: 1,
          paddingTop: 90,
          backgroundColor: '#0A0A0A'
        }}
      >
        {imageView}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end'
          }}
        ></View>
        <View
          style={{
            flex: 0,
            marginBottom: 30
          }}
        >
          {this.state.selectedCategory && this.state.selectedValue ? (
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={this.state.selectedValueRange.min}
              maximumValue={this.state.selectedValueRange.max}
              step={3}
              onValueChange={(val) => this.onChangeSliderValue(val)}
              value={this.state.sliderValue}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          ) : (
            null
          )}
          {this.state.selectedCategory ? (
            <ListView
              data={Object.keys(this.state.editValue[this.state.selectedCategory])}
              horizontal={true}
              renderRow={this.renderRow}
            />
          ) : (
            null
          )}
          <ListView
            data={Object.keys(this.state.editValue)}
            horizontal={true}
            renderRow={this.renderCategoryRow}
          />
        </View>
      </Screen>
    )
  }
}