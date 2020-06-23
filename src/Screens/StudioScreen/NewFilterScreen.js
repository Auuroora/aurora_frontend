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
  onChangeBrightness,
  onChangeContrast,
  onChangeExposure,
  onChangeGamma,
  onChangeGrain,
  onChangeVignette,
} from '../../OpencvJs'

const { width, height } = Dimensions.get('window')

export default class NewFilterScreen extends React.Component {
  static propTypes = {
    image: PropTypes.object,
    onNewFilterDone: PropTypes.func,
    isDone: PropTypes.bool,
    cancelDone: PropTypes.func
  }

  static img = {}
  values = {
    Hue: 0,
    Saturation: 0,
    Lightness: 0,
    Temperature: 0,
    Vibrance:0,
    HighlightHue:0,
    HighlightSaturation:0,
    ShadowHue:0,
    ShadowSaturation:0,
    Tint: 0,
    Clarity: 0,
    Brightness:0,
    Contrast:0,
    Exposure: 0,
    Gamma: 100,
    Grain: 0,
    Vignette: 0,
  }

  constructor (props) {
    super(props)
    this.img = props.image

    this.state = {
      isImageLoaded: false,
      intervalHandler: null,
      valuesRange: {
        Hue: { min: -100, max : 100, origin: 0 },
        Saturation: { min: -100, max : 100, origin: 0 },
        Lightness: { min: -100, max : 100, origin: 0 },
        Temperature: { min: -100, max : 100, origin: 0 },
        Vibrance: { min: -100, max : 100, origin: 0 },
        HighlightHue: { min: -100, max : 100, origin: 0 },
        HighlightSaturation: { min: -100, max : 100, origin: 0 },
        ShadowHue: { min: -100, max : 100, origin: 0 },
        ShadowSaturation: { min: -100, max : 100, origin: 0 },
        Tint: { min: -100, max : 100, origin: 0 },
        Clarity: { min: -100, max : 100, origin: 0 },
        Brightness: { min: -100, max : 100, origin: 0 },
        Contrast: { min: -100, max : 100, origin: 0 },
        Exposure: { min: -100, max : 100, origin: 0 },
        Gamma: { min: 1, max : 200, origin: 100 },
        Grain: { min: 0, max : 100, origin: 0 },
        Vignette: { min: -100, max : 100, origin: 0 },
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
    const imageDownSizeHeight = this.img.height * (width / this.img.width)

    loadImg(this.img.data, imageDownSizeWidth / 1 , imageDownSizeHeight / 1)
      .then(() => {
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

  componentDidMount () {
    let handler = setInterval(() => {
      this.forceUpdate()
    }, 50)

    this.setState({intervalHandler: handler})
  }

  mapCvFunction = (type) => {
    if(type === 'Hue') return onChangeHue
    if(type === 'Saturation') return onChangeSaturation
    if(type === 'Lightness') return onChangeLightness
    if(type === 'Temperature') return onChangeTemperature
    if(type === 'Vibrance') return onChangeVibrance
    if(type === 'HighlightHue') return onChangeHighlightHue
    if(type === 'HighlightSaturation') return onChangeHighlightSaturation
    if(type === 'ShadowHue') return onChangeShadowHue
    if(type === 'ShadowSaturation') return onChangeShadowSaturation
    if(type === 'Tint') return onChangeTint
    if(type === 'Clarity') return onChangeClarity
    if(type === 'Brightness') return onChangeBrightness
    if(type === 'Contrast') return onChangeContrast
    if(type === 'Exposure') return onChangeExposure
    if(type === 'Gamma') return onChangeGamma
    if(type === 'Grain') return onChangeGrain
    if(type === 'Vignette') return onChangeVignette
  }

  mapTileIcon = (type) => {
    if(type === 'Hue') return require('../../assets/tile/Hue.png')
    if(type === 'Saturation') return require('../../assets/tile/Saturation.png')
    if(type === 'Lightness') return require('../../assets/tile/Lightness.png')
    if(type === 'Temperature') return require('../../assets/tile/Temperature.png')
    if(type === 'Vibrance') return require('../../assets/tile/Vibrance.png')
    if(type === 'HighlightHue') return require('../../assets/tile/HighlightHue.png')
    if(type === 'HighlightSaturation') return require('../../assets/tile/HighlightSaturation.png')
    if(type === 'ShadowHue') return require('../../assets/tile/ShadowHue.png')
    if(type === 'ShadowSaturation') return require('../../assets/tile/ShadowSaturation.png')
    if(type === 'Tint') return require('../../assets/tile/Tint.png')
    if(type === 'Clarity') return require('../../assets/tile/Clarity.png')
    if(type === 'Brightness') return require('../../assets/tile/Brightness.png')
    if(type === 'Contrast') return require('../../assets/tile/Contrast.png')
    if(type === 'Exposure') return require('../../assets/tile/Exposure.png')
    if(type === 'Gamma') return require('../../assets/tile/Gamma.png')
    if(type === 'Grain') return require('../../assets/tile/Grain.png')
    if(type === 'Vignette') return require('../../assets/tile/Vignette.png')
  }

  // User Event for image operation
  onChangeSliderValue = async (val) => {
    try {
      this.values[this.state.selectedValue] = val
      this.img.data = await this.state.editFunction(val)
    } catch (e) {
      console.log(e)
    }
  }

  onPressValueTile = async (val) => {
    const selectedValueTile = this.values[val]
    await this.setState({
      sliderValue: selectedValueTile
    })
    await this.setState({
      selectedValue: val,
      editFunction: this.mapCvFunction(val),
      selectedValueRange: this.state.valuesRange[val],
    })

    this.slider.setNativeProps({value: selectedValueTile})
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.isDone !== this.props.isDone && this.props.isDone) {
      for (let ii in this.values) {
        if (this.values[ii] !== this.state.valuesRange[ii].origin) {
          this.props.onNewFilterDone(this.img.data, this.values)
          return
        }
      }

      this.props.cancelDone()
      alert('바뀐 보정값이 없습니다!' + this.props.isDone)
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalHandler)
  }

  // For Rendering Image View
  bindImageView = () => {
    if (this.state.isImageLoaded) {
      return (
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.img.data }}
          style={{
            width: width,
            height: this.img.height * (width / this.img.width),
            maxHeight: height / 1.8
          }}
        />
      )
    }
    return (
      <Spinner styleName='large'/>
    )
  }
  // For Rendering Lightness Tile
  renderValueTile = (data, sectionId, rowId) => {
    return (
      <FilterTile
        onPressTile={this.onPressValueTile.bind(this)}
        key={data}
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
                  {this.values[this.state.selectedValue]}
                </Title>
                
                <Slider
                  style={{width: width * 0.9, height: 40, marginLeft: width * 0.05, marginRight: width * 0.05}}
                  minimumValue={this.state.selectedValueRange.min}
                  maximumValue={this.state.selectedValueRange.max}
                  step={2}
                  value={this.state.sliderValue}
                  onValueChange={(val) => this.onChangeSliderValue(val)}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#252526"
                  ref={r => this.slider = r}
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
              data={Object.keys(this.values)}
              horizontal={true}
              renderRow={this.renderValueTile}
            />
          </View>

        </View>
      </Screen>
    )
  }
}