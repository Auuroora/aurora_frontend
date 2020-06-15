import React, { Component } from 'react'

// Import UI Components
import {
  Screen,
  NavigationBar,
} from '@shoutem/ui'

// Import Custom UI
import ImagePicker from 'react-native-image-picker'
import FilterListScreen from './FilterListScreen'
import NewFilterScreen from './NewFilterScreen'
import Title from '../../Components/Title'
import RightButton from './RightButton'
import LeftButton from './LeftButton'

// Import AWS SDK
import AWS from 'aws-sdk'
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv'

import {saveImage} from '../../utils'
import axios from '../../axiosConfig'


const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: 'aurora-filter-storage',
  signatureVersion: 'v4'
})

const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

class StudioScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewFilter: false,
      imageFile: {},
      isDone: false,
      isUploading: false
    }
  }

  // User Event Handelers
  onPressCancel = () => {
    this.setState({isNewFilter: false})
  }

  onChooseFileforNew = () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
        return
      }
      if (response.error) {
        return
      }
      if (response.customButton) {
        return
      } 
      let source = response
      this.setState({
        imageFile: source,
        isNewFilter: true,
        isDone: false
      })
    })
  }

  onPressDone = async () => {
    this.setState({isDone: true})
  }

  // Utils for upload preset and image
  urlToBlob = (url) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()
    })
  }

  // uuid generator
  guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  onNewFilterDone = async (image, preset) => {
    try {
      const imageUri = await this.urlToBlob('data:image/jpeg;base64,' + image)
  
      // Start Upload phase
      this.setState({isUploading: true})
  
      // filter_name Formatting 
      const timestamp = new Date().getTime()
      const filename = this.guid()
    
      // Upload Image
      let res = await s3.upload({
        Bucket: 'aurora-filter-storage',
        Key: timestamp + '/' + filename + '.jpg',
        ContentType: 'image/jpeg',
        ContentEncoding: 'base64',
        Body: imageUri,
        ACL: 'public-read'
      }).promise()
  
      // Upload Preset
      res = await s3.upload({
        Bucket: 'aurora-filter-storage',
        Key: timestamp + '/' + filename + '.json',
        ContentType: 'application/json',
        Body: JSON.stringify(preset),
        ACL: 'public-read'
      }).promise()

      // Api call
      const data = {
        filter: {
          filter_name: timestamp + '/' + filename + '.jpg',
          filter_data_path: timestamp + '/' + filename + '.json'
        }
      }
      res = await axios.post('/filters', data)
      await saveImage('data:image/jpeg;base64,' + image)
    } catch (e) {
      alert('필터 생성에 실패하였습니다.')
      console.log(e)
    } finally {
      // Return to FilterListScreen
      this.setState({isUploading: false})
      this.setState({isNewFilter: false})
      alert("새 필터를 만들었습니다!")
    }
  }

  bindScreen = () => {
    if (this.state.isNewFilter) {
      return (
        <NewFilterScreen
          onNewFilterDone={this.onNewFilterDone}
          isDone={this.state.isDone}
          image={this.state.imageFile}
        />
      )
    }
    return (
      <FilterListScreen/>
    )
  }

  render() {
    let currentView = this.bindScreen()

    return (
      <Screen 
        styleName='fill-parent'
        style={{backgroundColor: '#1E1E1E'}}
      >
        <NavigationBar
          styleName='inline clear'
          centerComponent={<Title title={'Studio'}/>}
          rightComponent={
            <RightButton 
              onPressDone={this.onPressDone}
              onPressNew={this.onChooseFileforNew} 
              isNewFilter={this.state.isNewFilter}
              isUploading={this.state.isUploading}
            />
          }
          leftComponent={
            <LeftButton 
              onPressCancel={this.onPressCancel}
              isNewFilter={this.state.isNewFilter}
            />
          }
        />
        {currentView}
      </Screen>
    )
  }
}

export default StudioScreen