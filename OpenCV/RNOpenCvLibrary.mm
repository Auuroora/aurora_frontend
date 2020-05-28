#import "RNOpenCvLibrary.h"
#import <React/RCTLog.h>

#import "define.h"
#import "header.h"
#import <opencv2/imgcodecs/ios.h>

@implementation RNOpenCvLibrary

using namespace cv;
using namespace std;

WorkingImgInfo imginfo;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initCV: (NSString *)imageAsBase64 downsizing_col:(NSInteger)downsizing_col downsizing_row:(NSInteger)downsizing_row callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"Start");
  UIImage* image = [self decodeBase64ToImage:imageAsBase64];
  Mat inputImg;
  UIImageToMat(image, inputImg);
  imginfo.init_all(inputImg,downsizing_col,downsizing_row);
  NSString* kk = @"as";
  NSLog(@"End");
  
  callback(@[[NSNull null], kk]);
}

RCT_EXPORT_METHOD(onChangeHue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_hue((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeSaturation: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_saturation((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeLightness: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_lightness((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeTemperature: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_temperature((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeVibrance: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_vibrance((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

// RCT_EXPORT_METHOD(onChangeHighlightHue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
//   NSLog(@"%d", (int)value);
//   Mat res_img = on_change_highlight_hue((int)value);
  
//   UIImage* result = MatToUIImage(res_img);
  
//   NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
//   NSString *encodedString = [imageData base64Encoding];
//   callback(@[[NSNull null], encodedString]);
// }

// RCT_EXPORT_METHOD(onChangeHighlightSaturation: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
//   NSLog(@"%d", (int)value);
//   Mat res_img = on_change_highlight_saturation((int)value);
  
//   UIImage* result = MatToUIImage(res_img);
  
//   NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
//   NSString *encodedString = [imageData base64Encoding];
//   callback(@[[NSNull null], encodedString]);
// }

// RCT_EXPORT_METHOD(onShadowHue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
//   NSLog(@"%d", (int)value);
//   Mat res_img = on_change_shadow_hue((int)value);
  
//   UIImage* result = MatToUIImage(res_img);
  
//   NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
//   NSString *encodedString = [imageData base64Encoding];
//   callback(@[[NSNull null], encodedString]);
// }

// RCT_EXPORT_METHOD(onShadowSaturation: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
//   NSLog(@"%d", (int)value);
//   Mat res_img = on_change_shadow_saturation((int)value);
  
//   UIImage* result = MatToUIImage(res_img);
  
//   NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
//   NSString *encodedString = [imageData base64Encoding];
//   callback(@[[NSNull null], encodedString]);
// }

RCT_EXPORT_METHOD(onChangeTint: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  Mat res_img = on_change_tint((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeClarity: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  Mat res_img = on_change_clarity((int)value);
  
  UIImage* result = MatToUIImage(res_img);

  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

//파라미터 2개
// RCT_EXPORT_METHOD(onChangeBrightnessAndConstrast: (NSInteger)BrightnessValue ConstrastValue:(NSInteger)ConstrastValue callback:(RCTResponseSenderBlock)callback) {
//   NSLog(@"%d %d", (int)BrightnessValue,(int)ConstrastValue);
//   Mat res_img = on_change_brightness_and_constrast((int)BrightnessValue,(int)ConstrastValue);
  
//   UIImage* result = MatToUIImage(res_img);
  
//   NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
//   NSString *encodedString = [imageData base64Encoding];
//   callback(@[[NSNull null], encodedString]);
// }

RCT_EXPORT_METHOD(onChangeExposure: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_exposure((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

//파라미터가 float로 !! 에러로 인해 우선 NSInteger로 
RCT_EXPORT_METHOD(onChangeGamma: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  Mat res_img = on_change_gamma((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeGrain: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_grain((int)value);
  NSLog(@"%d", (int)value);
  
  UIImage* result = MatToUIImage(res_img);
  NSLog(@"%d", (int)value);
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeVignette: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_change_vignette((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

Mat on_change_hue(int cur_pos){
  update_hue(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_saturation(int cur_pos){
  update_saturation(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_lightness(int cur_pos){
  update_lightness(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_temperature(int cur_pos) {
  // NSLog(@"rows: %d", imginfo.origin_img.rows);
  // NSLog(@"cols: %d", imginfo.origin_img.cols);
  // NSLog(@"channels: %d", imginfo.origin_img.channels());
  // NSLog(@"type: %d", imginfo.origin_img.type());
  
	update_temperature(cur_pos);
	apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_vibrance(int cur_pos){
  update_vibrance(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

// Mat on_change_highlight_hue(int cur_pos){
//   update_highlight_hue(cur_pos);
//   apply_filter();
//   return imginfo.get_res_img();
// }

// Mat on_change_highlight_saturation(int cur_pos){
//   update_highlight_saturation(cur_pos);
//   apply_filter();
//   return imginfo.get_res_img();
// }

// Mat on_change_shadow_hue(int cur_pos){
//   update_shadow_hue(cur_pos);
//   apply_filter();
//   return imginfo.get_res_img();
// }

// Mat on_change_shadow_saturation(int cur_pos){
//   update_shadow_saturation(cur_pos);
//   apply_filter();
//   return imginfo.get_res_img();
// }

Mat on_change_tint(int cur_pos){
  update_tint(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_clarity(int cur_pos){
  update_clarity(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

// Mat on_change_brightness_and_constrast(int brightness_pos,int constrast_pos){
//   update_brightness_and_constrast(brightness_pos,constrast_pos);
//   apply_filter();
//   return imginfo.get_res_img();
// }

Mat on_change_exposure(int cur_pos){
  update_exposure(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_gamma(int cur_pos){
  update_gamma(cur_pos-100);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_grain(int cur_pos){
  update_grain(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_change_vignette(int cur_pos){
  update_vignette(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}


@end
