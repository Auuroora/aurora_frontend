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
  Screen,
  Text,
  Title
} from '@shoutem/ui'
import FilterTile from './FilterTile'

// Import OpenCV Libraries
import {
  loadImg,
  onChangeTemperature,
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

//TODO : fix Slider Value reset problem

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
      values: {
        Temperature: 0,
        Saturation: 0,
        Tint: 0,
        Hue: 0,
        Vignette: 0,
        Gamma: 100,
        Exposure: 0,
        Value: 0,
        Grain: 0,
        Clarity: 0,
        Vibrance: 0
      },
      valuesRange: {
        Temperature: { min: -100, max : 100 },
        Saturation: { min: -100, max : 100 },
        Tint: { min: -100, max : 100 },
        Hue: { min: -100, max : 100 },
        Vignette: { min: -100, max : 100 },
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
      imageWidth: 0,
      imageHeight: 0
    }

    const imageDownSizeWidth = width
    const imageDownSizeHeight = this.state.image.height * (width / this.state.image.width)

    loadImg(this.state.image.data, imageDownSizeWidth, imageDownSizeHeight)
      .then(() => {
        this.setState({})
        this.setState({
          imageWidth: imageDownSizeWidth,
          imageHeight: imageDownSizeHeight,
          isImageLoaded: true
        })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  mapCvFunction = (type) => {
    if(type === 'Saturation') return onChangeSaturation
    if(type === 'Temperature') return onChangeTemperature
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

  mapTileIcon = (type) => {
    if(type === 'Saturation') return require('../../assets/tile/Saturation.png')
    if(type === 'Temperature') return require('../../assets/tile/Temperature.png')
    if(type === 'Vignette') return require('../../assets/tile/Vignette.png')
    if(type === 'Grain') return require('../../assets/tile/Grain.png')
    if(type === 'Gamma') return require('../../assets/tile/Gamma.png')
    if(type === 'Exposure') return require('../../assets/tile/Exposure.png')
    if(type === 'Clarity') return require('../../assets/tile/Clarity.png')
    if(type === 'Tint') return require('../../assets/tile/Tint.png')
    if(type === 'Vibrance') return require('../../assets/tile/Vibrance.png')
    if(type === 'Value') return require('../../assets/tile/Value.png')
    if(type === 'Saturation') return require('../../assets/tile/Saturation.png')
    if(type === 'Hue') return require('../../assets/tile/Hue.png')
  }

  // User Event for image operation
  onChangeSliderValue = async (val) => {
    await this.setState(prevState => ({
      values: {
        ...prevState.values,
        [this.state.selectedValue]: val
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

  onPressValueTile = async (val) => {
    const selectedValueTile = this.state.values[val]
    console.log(val + selectedValueTile)
    await this.setState({
      sliderValue: selectedValueTile
    })
    await this.setState({
      selectedValue: val,
      editFunction: this.mapCvFunction(val),
      selectedValueRange: this.state.valuesRange[val],
    })
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isDone !== this.props.isDone && this.props.isDone) {
      this.props.onNewFilterDone(this.state.image.data, this.state.values)
      // TODO: close and reset all variables
    }
  }

  // For Rendering Image View
  bindImageView = () => {
    if (this.state.isImageLoaded) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.state.image.data }}
          style={{
            width: this.state.imageWidth,
            height: this.state.imageHeight,
          }}
          styleName='large'
        />
      )
    }
    return (
      <Spinner styleName='large'/>
    )
  }
  // For Rendering Value Tile
  renderValueTile = (data) => {
    return (
      <FilterTile
        onPressTile={this.onPressValueTile.bind(this)}
        title={data}
        size={'small'}
        image={this.mapTileIcon(data)}
      />
    )
  }
  
  render () {
    let imageView = this.bindImageView()
    return (
      <Screen
        style={{
          flex: 1,
          backgroundColor: '#0A0A0A'
        }}
      >
        {imageView}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flex: 0,
              marginBottom: 10  
            }}
          >
            {this.state.selectedValue ? (
              <View style={{marginBottom: 10}}>
                <Title        
                  styleName='h-center'
                  style={{
                    color: '#FEFEFE'
                  }}
                >
                  {this.state.values[this.state.selectedValue]}
                </Title>
                
                <Slider
                  style={{width: width * 0.9, height: 40, marginLeft: width * 0.05, marginRight: width * 0.05}}
                  minimumValue={this.state.selectedValueRange.min}
                  maximumValue={this.state.selectedValueRange.max}
                  step={3}
                  value={this.state.sliderValue}
                  onValueChange={(val) => this.onChangeSliderValue(val)}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#252526"
                />

                <View styleName='horizontal space-between'>
                  <Text
                    style={{marginLeft: 20}}
                  >
                    {this.state.selectedValueRange.min}
                  </Text>
                  <Text
                    style={{marginRight: 20}}
                  >
                    {this.state.selectedValueRange.max}
                  </Text>
                </View>
              </View>
            ) : (
              null
            )}
            <ListView
              data={Object.keys(this.state.values)}
              horizontal={true}
              renderRow={this.renderValueTile}
            />
          </View>

        </View>
      </Screen>
    )
  }
}