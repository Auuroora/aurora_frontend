import { NativeModules, Platform } from "react-native"

const OpenCV = NativeModules.RNOpenCvLibrary

const loadImg = (imgPath, rowSize, colSize) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      resolve(true)
    } else {
      OpenCV.initCV(imgPath, rowSize, colSize, (error, data) => {
        if (data) {
          resolve(data)
        } else {
          reject(error)
        }
      })
    }
  })
}


const onChangeHue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeHue(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeSaturation(val, (error, data) => {
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

const onChangeLightness = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeLightness(val, (error, data) => {
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

const onChangeTemperature = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeTemperature(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeVibrance(val, (error, data) => {
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

const onChangeHighlightHue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeTemperature(val, (error, data) => {
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

const onChangeHighlightSaturation = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeHighlightSaturation(val, (error, data) => {
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

const onChangeShadowHue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeShadowHue(val, (error, data) => {
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

const onChangeShadowSaturation = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeShadowSaturation(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeTint(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeClarity(val, (error, data) => {
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

const onChangeBrightnessAndConstrast = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeBrightnessAndConstrast(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeExposure(val, (error, data) => {
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
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeGamma(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeGrain(val, (error, data) => {
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
    if (Platform.OS === "android") {
      // this is for android callback customize
    } else {
      OpenCV.onChangeVignette(val, (error, data) => {
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
  onChangeBrightnessAndConstrast,
  onChangeExposure,
  onChangeGamma,
  onChangeGrain,
  onChangeVignette,
}
