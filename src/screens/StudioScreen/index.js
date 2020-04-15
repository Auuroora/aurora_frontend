import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Button,
  Image,
  Text
} from 'react-native'
import {
  loadImg,
  updateSaturation
} from '../../OpencvJs'
import Slider from '@react-native-community/slider'
import ImagePicker from 'react-native-image-picker'
import styles from './styles'

const ImagePickerOptions = {
  title: 'Select Image',
  customButtons: [
    { 
      name: 'customOptionKey',
      title: 'Choose Photo from Custom Option'
    },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: {},
      sliderVal: 0,
      testNativeMethod: '',
      cameraPermission: false,
    }
  }

  chooseFile = () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        alert(response.customButton)
      } else {
        let source = response
        this.setState({
          filePath: source,
        })
        try {
          await loadImg(response.data)
        } catch (error) {
          console.log('asdfasdf' + error)
        }
      }
    })
  };

  onChangeValue = async value => {
    this.setState({sliderVal: value})
    try {
      const resultImg = await updateSaturation(value)
      this.setState({ 
        filePath: {
          data: resultImg
        }
      })
    } catch (error) {
      console.log('err', error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'data:image/jpeg;base64,' + this.state.filePath.data }}
          style={{ width: 250, height: 250 }}
        />
        <Text>{this.state.sliderVal}</Text>
        <Slider
          style={{width: 200, height: 40}}
          step={1}
          minimumValue={-100}
          maximumValue={100}
          onValueChange={this.onChangeValue.bind(this)}
          minimumTrackTintColor="#55CBD3"
          maximumTrackTintColor="#FFB68C"
        />
        <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
      </View>
    )
  }
}

AppRegistry.registerComponent('CameraScreen', () => CameraScreen)