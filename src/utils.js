import {
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
} from './OpencvJs'

import ImagePicker from 'react-native-image-picker'
import CameraRoll from '@react-native-community/cameraroll'

import AWS from 'aws-sdk'
import {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from 'react-native-dotenv'

const ImagePickerOptions = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

const s3 = new AWS.S3({
  region: 'ap-northeast-2',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: 'aurora-filter-storage',
  signatureVersion: 'v4'
})

const mapCvFunction = (type) => {
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
  if (type === 'Brightness') return onChangeBrightness
  if (type === 'Contrast') return onChangeContrast
  if (type === 'Exposure') return onChangeExposure
  if (type === 'Gamma') return onChangeGamma
  if (type === 'Grain') return onChangeGrain
  if (type === 'Vignette') return onChangeVignette
}

const selectImage = () => {
  return new Promise(((resolve, reject) => {
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker')
      } else if (response.error) {
        reject('ImagePicker Error: ', response.error)
      } else if (response.camera) {
        reject('User tapped custom button: ', response.camera)
      } else {
        resolve(response)
      }
    })
  }))
}

const saveImage = async (image) => {
  return await CameraRoll.save(image, 'photo')
}

const guid = () => {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const urlToBlob = (url) => {
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

const uploadImageToS3 = async (image) => {
  const timestamp = new Date().getTime()
  const filename = guid()
  const key = timestamp + '/' + filename + '.jpg'

  try {
    const imageUri = await urlToBlob(image)

    await s3.upload({
      Bucket: 'aurora-filter-storage',
      Key: key,
      ContentType: 'image/jpeg',
      ContentEncoding: 'base64',
      Body: imageUri,
      ACL: 'public-read'
    }).promise()
  } catch (e) {
    alert('Image upload failed :' + e)
  }

  return key    
}

const uploadFileToS3 = async (jsonFile) => {
  const timestamp = new Date().getTime()
  const filename = guid()
  const key = timestamp + '/' + filename + '.json'

  try {
    await s3.upload({
      Bucket: 'aurora-filter-storage',
      Key: key,
      ContentType: 'application/json',
      Body: JSON.stringify(jsonFile),
      ACL: 'public-read'
    }).promise()

  } catch (e) {
    alert('Image upload failed :' + e)
  }

  return key    
}

export {
  mapCvFunction,
  uploadImageToS3,
  guid,
  selectImage,
  urlToBlob,
  uploadFileToS3,
  saveImage
}