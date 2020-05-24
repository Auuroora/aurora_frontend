#import "RNOpenCvLibrary.h"
#import <React/RCTLog.h>

#import "define.h"
#import "header.h"
#import <opencv2/imgcodecs/ios.h>

@implementation RNOpenCvLibrary

using namespace cv;
using namespace std;
using namespace BGR;
using namespace HSV;
using namespace HLS;

WorkingImgInfo imginfo;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initCV: (NSString *)imageAsBase64 downsizing_row:(NSInteger)downsizing_row downsizing_col:(NSInteger)downsizing_col callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"Start");
  UIImage* image = [self decodeBase64ToImage:imageAsBase64];
  Mat inputImg;
  UIImageToMat(image, inputImg);
  init(inputImg,downsizing_row,downsizing_col);
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
  NSLog(@"%d", (int)value);
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
  update_gamma(cur_pos);
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

void init(Mat &img,int downsizing_row,int downsizing_col)
{
	/*********************************************************************
	*	convert and setting
	*********************************************************************/
	/* save original Image */
	imginfo.set_origin_img(img);

	/* downsizing */

	downsize_image(img, imginfo.image.downsized, downsizing_row, downsizing_col);
	// imginfo.image.downsized = img.clone();

	imginfo.row = imginfo.image.downsized.rows;
	imginfo.col = imginfo.image.downsized.cols;

	/* convert to 3 channels(BGRA -> BGR) */
	if (imginfo.image.downsized.channels() == 4) {
		cv::cvtColor(imginfo.image.downsized, imginfo.image.downsized, COLOR_BGRA2BGR);
	}

	/*********************************************************************
	*	variable initialize
	*********************************************************************/
	/* setting img */
	imginfo.image.bgr = imginfo.image.downsized.clone();
	cv::cvtColor(imginfo.image.bgr, imginfo.image.hls, COLOR_BGR2HLS);
	cv::cvtColor(imginfo.image.bgr, imginfo.image.hsv, COLOR_BGR2HSV);

	cv::split(imginfo.image.bgr, imginfo.image.bgr_origins);
	cv::split(imginfo.image.hls, imginfo.image.hls_origins);
	cv::split(imginfo.image.hsv, imginfo.image.hsv_origins);

	Mat mask;
	cv::inRange(imginfo.image.hls_origins[HLSIndex::S], 0, 0, mask);
	imginfo.image.hls_origins[HLSIndex::S].setTo(1, mask);
	cv::inRange(imginfo.image.hls_origins[HLSIndex::L], 0, 0, mask);
	imginfo.image.hls_origins[HLSIndex::L].setTo(1, mask);

	cv::inRange(imginfo.image.hsv_origins[HSVIndex::S], 0, 0, mask);
	imginfo.image.hsv_origins[HSVIndex::S].setTo(1, mask);
	cv::inRange(imginfo.image.hsv_origins[HSVIndex::V], 0, 0, mask);
	imginfo.image.hsv_origins[HSVIndex::V].setTo(1, mask);

	/* init diff matrix */
	imginfo.filter.bgr_filters.resize(3);
	imginfo.filter.hls_filters.resize(3);
	imginfo.filter.hsv_filters.resize(3);

	imginfo.filter.bgr_filters[BGRIndex::B] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.bgr_filters[BGRIndex::G] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.bgr_filters[BGRIndex::R] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);

	imginfo.filter.hls_filters[HLSIndex::H] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hls_filters[HLSIndex::L] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hls_filters[HLSIndex::S] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);

	imginfo.filter.hsv_filters[HSVIndex::H] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hsv_filters[HSVIndex::S] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hsv_filters[HSVIndex::V] = Mat::zeros(imginfo.row, imginfo.col, CV_16S);

	imginfo.filter.diff = Mat::zeros(imginfo.row, imginfo.col, CV_16S);

	//*******************************************************************************************************

	// Gamma
	imginfo.filter.hsv_filters[HSVIndex::V].convertTo(imginfo.filter.gamma_mask, CV_32F);
	cv::multiply(1. / 255, imginfo.filter.gamma_mask, imginfo.filter.gamma_mask);

	//Clarity
	cv::bilateralFilter(imginfo.image.bgr, imginfo.filter.clarity_filter, DISTANCE, SIGMA_COLOR, SIGMA_SPACE);
	imginfo.filter.clarity_mask_U = Mat::zeros(imginfo.row, imginfo.col, CV_8UC3);
	imginfo.filter.clarity_mask_S = Mat::zeros(imginfo.row, imginfo.col, CV_16SC3);


	//Vignette
	Mat kernel_x,kernel_x_transpose, kernel_y, kernel_res;
	kernel_x = cv::getGaussianKernel(imginfo.col, 1000,CV_32F);
	kernel_y = cv::getGaussianKernel(imginfo.row, 1000,CV_32F);
	cv::transpose(kernel_x, kernel_x_transpose);
	kernel_res = (kernel_y * kernel_x_transpose);
	cv::normalize(kernel_res, kernel_res, 0,1,NORM_MINMAX);
	cv::subtract(1,kernel_res,kernel_res);
	kernel_res = cv::abs(kernel_res);
	cv::multiply(125,kernel_res,kernel_res);
	kernel_res.convertTo(kernel_res,CV_16S);
	imginfo.filter.gaussian_kernel = kernel_res.clone();				//getUMat(cv::ACCESS_RW);
	
	kernel_x.deallocate();
	kernel_x_transpose.deallocate();
	kernel_y.deallocate();
	kernel_res.deallocate();

	//Grain
	imginfo.filter.grain_mask = Mat::zeros(imginfo.row, imginfo.col, CV_32F);
	cv::randu(imginfo.filter.grain_mask, Scalar(-20), Scalar(20));

	//Exposure
	imginfo.filter.exposure_mask = Mat::ones(imginfo.row, imginfo.col, CV_8UC1);

	//*******************************************************************************************************
}

@end
