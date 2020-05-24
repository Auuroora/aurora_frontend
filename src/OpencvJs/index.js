import { 
  NativeModules,
  Platform 
} from 'react-native'

const OpenCV = NativeModules.RNOpenCvLibrary

const loadImg = (imgPath, rowSize, colSize) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android'){
      resolve(true)
    }
    else{
      OpenCV.initCV(imgPath, rowSize, colSize, (error, data) => {
        if (data) {
          resolve(data)
        }
        else {
          reject(error)
        }
      })
    }
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

const onChangeHue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeHue(val,(error, data) => {
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

const onChangeSaturation = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeSaturation(val,(error, data) => {
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

const onChangeValue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeValue(val,(error, data) => {
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

const onChangeVibrance = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeVibrance(val,(error, data) => {
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

const onChangeTint = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeTint(val,(error, data) => {
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

const onChangeClarity = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeClarity(val,(error, data) => {
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

const onChangeExposure = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeExposure(val,(error, data) => {
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

const onChangeGamma = (val) => {
  val = val / 100
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeGamma(val,(error, data) => {
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

const onChangeGrain = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeGrain(val,(error, data) => {
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

const onChangeVignette = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      // this is for android callback customize
    } else {
      OpenCV.onChangeVignette(val,(error, data) => {
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
  updateTemperature,
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
}