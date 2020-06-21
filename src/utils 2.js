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

export {
  mapCvFunction
}