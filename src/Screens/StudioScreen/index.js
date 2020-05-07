import React, { Component } from 'react'

// Import UI Components
import {
  StatusBar
} from 'react-native'
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

class StudioScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewFilter: false,
      imageFile: {}
    }
  }

  onChooseFile = () => {
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
        isNewFilter: true
      })
    })
  }

  onPressCancel = () => {
    this.setState({isNewFilter: false})
  }

  bindScreen = () => {
    if (this.state.isNewFilter) {
      return (
        <NewFilterScreen
          image={this.state.imageFile}
        />
      )
    }
    return (<FilterListScreen/>)
  }

  render() {
    let currentView = this.bindScreen()

    return (
      <Screen styleName='fill-parent'>
        <StatusBar barStyle="dark-content"/>
        <NavigationBar
          styleName='inline'
          centerComponent={<Title title={'Studio'}/>}
          rightComponent={
            <RightButton 
              onPressNew={this.onChooseFile} 
              isNewFilter={this.state.isNewFilter}
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