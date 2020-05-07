import { 
  NativeModules,
  Platform 
} from 'react-native'

const OpenCV = NativeModules.RNOpenCvLibrary

const loadImg = (imgPath) => {
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

const updateTemperature = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeTemperature(val,(error, data) => {
        if (data) {
          resolve(data)
        }
        if (error) {
          reject(error)
        }
      })
    }
  })
}

export {
  loadImg,
  updateTemperature
}