import React from 'react'
// import PropTypes from 'prop-types'
import Slider from '@react-native-community/slider'

import {
  Image,
  View,
  Spinner,
  ListView,
} from '@shoutem/ui'

// Import OpenCV Libraries
import {
  loadImg,
  updateTemperature
} from '../../OpencvJs'

import FilterTile from './FilterTile'

/* New Filter Screen Function TODO
 * 3. Add Function for upload preset to S3
 * 4. Add Function for upload image to S3
 * 5. Add Function for upload result to API Server
 */

/* PropTypes -> Add End of dev
NewFilterScreen.propTypes = {
  image: PropTypes.object,
}
*/

/* State
 * 1. Every slider's value
 * 2. Current photo path
 * 3. Selected Slider 
 */

export default class NewFilterScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: props.image,
      testSliderVal: 0,
      isImageLoaded: false,
      editValue: {
        Color: {
          Temperature: 0,
          Saturation: 0
        },
        Brightness: {
          asdf: 0
        },
        Etc: {
          a: 0
        }
      },
      selectedCategory: null,
      selectedValue: null,
      selectedReference: null,
      sliderValue: null,
      editFunction: null
    }
    loadImg(this.state.image.data)
      .then(() => {
        this.setState({isImageLoaded: true})
      })
      .catch(() => {
        // return err
      })
  }

  mapCvFunction = (type) => {
    const temp = () => {console.log('not yet')}
    if(type === 'Saturation') return temp
    if(type === 'Temperature') return updateTemperature
  }

  // User Event
  onChangeSliderValue = async (val) => {
    console.log(val)
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
    console.log(this.state.editValue)
  }

  onPressCategoryTile = (val) => {
    console.log(val)
    this.setState({selectedCategory: val})
    this.setState({selectedValue: null})
  }

  onPressValueTile = async (val) => {
    await this.setState({selectedValue: val})
    const selected = this.state.editValue[this.state.selectedCategory][this.state.selectedValue]
    console.log(selected)
    this.setState({sliderValue: selected})
    this.setState({editFunction: this.mapCvFunction(val)})
    console.log('selected Value : ' + this.state.selectedValue)
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
        image={'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}
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
        image={'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}
      />
    )
  }
  
  render () {
    let imageView = this.bindImageView()
    return (
      <View
        style={{flex: 1, paddingTop: 90}}
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
              minimumValue={-100}
              maximumValue={100}
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
        
      </View>
    )
  }
}