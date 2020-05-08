/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native'
import { 
  NavigationBar,
  TextInput,
  ImageBackground,
  Screen,
  Switch,
  TouchableOpacity,
  Icon,
  Text,
  Image,
  Subtitle,
  Button,
  View
} from '@shoutem/ui'

import Title from '../../Components/Title'
import ImagePicker from 'react-native-image-picker'

const { width, height } = Dimensions.get('window')

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
class UploadScreen extends Component{
  constructor() {
    super()
    this.state = {
      Facebook_switchOn: false,
      Instagram_switchOn: false,
      imageFile: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'
    }
  }
  onChooseFile = () => {
    //image 변경
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
        imageFile: 'data:image/jpeg;base64,'+ source.data
      })
    })
  }
  render(){
    const { Facebook_switchOn,Instagram_switchOn } = this.state
    return (
      <Screen styleName='fill-parent' style ={{backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground
          source={{uri: 'https://stores.selzstatic.com/nvyn50kugf4/assets/settings/lightscape-735108-unsplash.jpg?v=20200323080941'}}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <Button>
                <Icon name="left-arrow" />
              </Button>
            }
            centerComponent={
              <Title title={'Upload'} topMargin={50}/>
            }
            rightComponent={
              <Button>
                <Icon name="share" />
              </Button>
            }
          />
        </ImageBackground>
        <View styleName ="horizontal space-between" name = "Title" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Title</Subtitle>
          <TextInput
            placeholder={'Write Filter Title'}
            style ={{ paddingTop:15, backgroundColor: 'white', height: height/10, width :width*0.7}}/>
        </View>
        <View name = "Description" styleName ="horizontal space-between" style ={{margin :10}}>
          <TouchableOpacity 
            onPress ={this.onChooseFile} 
            styleName="flexible">
            <Image
              style ={{ height: height*0.15, width :height*0.15 ,padding :10}}
              source={{ uri:this.state.imageFile }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={'Write Filter Description'}
            style ={{ height: height*0.15, width : width*0.7 }}/>
        </View>
        <View styleName ="horizontal space-between" name = "Tag" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Tag</Subtitle>
          <TextInput
            placeholder={'Write Filter Tag using #'}
            style ={{ hpadding:15, height: height/12, width :width*0.7}}/>
        </View>
        <View styleName ="horizontal space-between" name = "Price" style ={{ margin :10}}>
          <Subtitle style ={styles.text}>Filter Price</Subtitle>
          <TextInput
            placeholder={'Write Filter Price'}
            style ={{ padding:15, height: height/12, width :width*0.7}}/>
        </View>
        <View styleName ="horizontal space-between" style ={{ padding :5}}>
          <Text style ={styles.text}>FaceBook</Text>
          <Switch 
            style ={{marginBottom: 10, paddingLeft :30}}
            onValueChange={value => this.setState({ Facebook_switchOn: value})}
            value={Facebook_switchOn}
          />          
        </View>
        <View styleName ="horizontal space-between" style ={{padding :5}}>
          <Text style ={styles.text}>Instagram</Text>
          <Switch styleName="disclosure"
            style ={{marginBottom: 10}}
            onValueChange={value => this.setState({ Instagram_switchOn: value})}
            value={Instagram_switchOn}
          />
        </View>

      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color : 'black',
    paddingLeft :10
  }
})

export default UploadScreen