import { NativeModules, Platform } from "react-native"

const OpenCV = NativeModules.RNOpenCvLibrary
const OpenCVAndroid = NativeModules.OpenCVModule

const loadImg = (img, rowSize, colSize) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      console.log("Android Called loadImg!")
      OpenCVAndroid.initCV(img, colSize, rowSize, data => {
        if (data) {
          console.log("(" + colSize + " x " + rowSize + ")")
          console.log("Android initCV Complete, size:(" + data + ")")
          resolve(data)
        } else {
          console.log("cvTestInt Fail")
          reject(data)
        }
      })
    } else {
      OpenCV.initCV(img, rowSize, colSize, (error, data) => {
        if (data) {
          resolve(data)
        } else {
          reject(error)
        }
      })
    }
  })
}

const getWatermarkedImg = (img, logo, width, height) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android') {
      OpenCVAndroid.getWatermarkedImg(img, logo, width, height, data =>{
        if (data) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    } else {
      OpenCV.getWatermarkedImg(img, logo, width, height, (err, data) => {
        if (data) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    }
  })
}

const onChangeHue = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      OpenCVAndroid.CVupdateHue(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateSaturation(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateLightness(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateTemperature(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateVibrance(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateHighlightHue(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    } else {
      OpenCV.onChangeHighlightHue(val, (error, data) => {
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
      OpenCVAndroid.CVupdateHighlightSaturation(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateShadowHue(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateShadowSaturation(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateTint(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateClarity(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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

const onChangeBrightness = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      OpenCVAndroid.CVupdateBrightness(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    } else {
      OpenCV.onChangeBrightness(val, (error, data) => {
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

const onChangeContrast = (val) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "android") {
      OpenCVAndroid.CVupdateContrast(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
    } else {
      OpenCV.onChangeContrast(val, (error, data) => {
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
      OpenCVAndroid.CVupdateExposure(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateGamma(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateGrain(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
      OpenCVAndroid.CVupdateVignette(val, data => {
        if (data) {
          resolve(data)
        }
        else {
          reject(data)
        }
      })
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
  onChangeBrightness,
  onChangeContrast,
  onChangeExposure,
  onChangeGamma,
  onChangeGrain,
  onChangeVignette,
  getWatermarkedImg
}
