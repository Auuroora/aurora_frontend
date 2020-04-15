import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Platform,
  Button,
  Image,
  Text
} from 'react-native'
import Slider from '@react-native-community/slider'
import ImagePicker from 'react-native-image-picker'
import OpenCV from '../../OpenCV'

import styles from './styles'


export default class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: {},
      sliderVal: 0,
      testNativeMethod: '',
      cameraPermission: false,
    }
    /* 
    this.takePicture = this.takePicture.bind(this)
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this)
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(this)
    */  
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
        alert(response.customButton)
      } else {
        let source = response
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        })
        this.loadImg(response.data)
      }
    })
  };

  loadImg(imgPath) {
    return new Promise((resolve, reject) => {
      OpenCV.initCV(imgPath, (error, data) => {
        if (data) {
          resolve(data)
        }
        else {
          reject(error)
        }
      })
    })
  }

  updateSaturation(val) {
    return new Promise((resolve, reject) => {
      OpenCV.onChangeSaturation(val,(error, data) => {
        resolve(data)
      })
    })
  }

  onChangeValue(value) {
    this.setState({sliderVal: value})
    console.log(value)
    this.updateSaturation(value).then(img => {
      this.setState({ 
        filePath: {
          data: img
        } 
      })
    }).catch(err => {
      console.log('err', err)
    })
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

  /* 
  checkForBlurryImage(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.checkForBlurryImage(imageAsBase64,
           error => {
          // error handling
        }, msg => {
          resolve(msg)
        })
      } else {
        OpenCV.checkForBlurryImage(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0])
        })
      }
    })
  }

  proceedWithCheckingBlurryImage() {
    const { content, photoPath } = this.state.photoAsBase64

    this.checkForBlurryImage(content).then(blurryPhoto => {
      if (blurryPhoto) {
        return this.repeatPhoto()
      }
      this.setState({ photoAsBase64: { ...this.state.photoAsBase64, isPhotoPreview: true, photoPath } })
    }).catch(err => {
      console.log('err', err)
    })
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri },
      })
      this.proceedWithCheckingBlurryImage()
    }
  }

  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: '',
      },
    })
  } */
}

AppRegistry.registerComponent('CameraScreen', () => CameraScreen)