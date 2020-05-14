#import "RNOpenCvLibrary.h"
#import <React/RCTLog.h>

#import "define.h"
#import "header.h"
#import <opencv2/imgcodecs/ios.h>

@implementation RNOpenCvLibrary

using namespace cv;

WorkingImgInfo imginfo;

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initCV: (NSString *)imageAsBase64 callback:(RCTResponseSenderBlock)callback) {
  UIImage* image = [self decodeBase64ToImage:imageAsBase64];
  Mat inputImg;
  UIImageToMat(image, inputImg);
  init(inputImg);
  NSString* kk = @"as";
  
  callback(@[[NSNull null], kk]);
}

RCT_EXPORT_METHOD(onChangeHue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_hue((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeSaturation: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_saturation((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeValue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_value((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeTemperature: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_temperature((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeVibrance: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_vibrance((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeHighlightHue: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_highlight_hue((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeHighlightSaturation: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_highlight_saturation((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeTint: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_tint((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeClarity: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_clarity((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

//파라미터 2개
RCT_EXPORT_METHOD(onChangeBrightnessAndConstrast: (NSInteger)BrightnessValue ConstrastValue:(NSInteger)ConstrastValue callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d %d", (int)BrightnessValue,(int)ConstrastValue);
  Mat res_img = on_update_brightness_and_constrast((int)BrightnessValue,(int)ConstrastValue);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeExposure: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_exposure((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

//파라미터가 float로
RCT_EXPORT_METHOD(onChangeGamma: (NSNumber)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (float)value);
  Mat res_img = on_update_gamma((float)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeGrain: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_grain((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

RCT_EXPORT_METHOD(onChangeVignette: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat res_img = on_update_vignette((int)value);
  
  UIImage* result = MatToUIImage(res_img);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

Mat on_update_hue(int cur_pos){
  update_hue(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_saturation(int cur_pos){
  update_saturation(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_value(int cur_pos){
  update_value(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_temperature(int cur_pos) {
  NSLog(@"rows: %d", imginfo.origin_img.rows);
  NSLog(@"cols: %d", imginfo.origin_img.cols);
  NSLog(@"channels: %d", imginfo.origin_img.channels());
  NSLog(@"type: %d", imginfo.origin_img.type());
  
	update_temperature(cur_pos);
	apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_vibrance(int cur_pos){
  update_vibrance(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_highlight_hue(int cur_pos){
  update_highlight_hue(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_highlight_saturation(int cur_pos){
  update_highlight_saturation(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_tint(int cur_pos){
  update_tint(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_clarity(int cur_pos){
  update_clarity(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_brightness_and_constrast(int brightness_pos,int constrast_pos){
  update_brightness_and_constrast(brightness_pos,constrast_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_exposure(int cur_pos){
  update_exposure(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_gamma(int cur_pos){
  update_gamma(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_grain(int cur_pos){
  update_grain(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

Mat on_update_vignette(int cur_pos){
  update_vignette(cur_pos);
  apply_filter();
  return imginfo.get_res_img();
}

- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}

void init(Mat &img) {
	// save original Image
	imginfo.set_origin_img(img);

	// downsizing
	imginfo.downsized_img = img.clone().getUMat(ACCESS_RW);
	imginfo.row = imginfo.downsized_img.rows;
	imginfo.col = imginfo.downsized_img.cols;
	// TO DO

	// convert to 3 channels(BGRA -> BGR)
	if (imginfo.downsized_img.channels() == 4) {
		cv::cvtColor(imginfo.downsized_img, imginfo.downsized_img, COLOR_BGRA2BGR);
	}

	// setting img
	//imginfo.bgr_img = imginfo.downsized_img.clone();
	imginfo.bgr_img = imginfo.downsized_img.clone();
	cv::cvtColor(imginfo.bgr_img, imginfo.hsv_img, COLOR_BGR2HSV);
	cv::split(imginfo.bgr_img, imginfo.filter.bgr_filters);
	cv::split(imginfo.hsv_img, imginfo.filter.hsv_filters);

	//split img
	cv::split(imginfo.bgr_img, imginfo.bgr_split);
	cv::split(imginfo.hsv_img, imginfo.hsv_split);

	//*******************************************************************************************************

	// Gamma
	imginfo.filter.hsv_filters[ColorSpaceIndex::V].convertTo(imginfo.filter.gamma_mask,CV_32F);
	cv::multiply(1./255,imginfo.filter.gamma_mask,imginfo.filter.gamma_mask);

	//Clarity
	cv::bilateralFilter(imginfo.bgr_img, imginfo.filter.clarity_filter, DISTANCE, SIGMA_COLOR, SIGMA_SPACE);
	imginfo.filter.clarity_mask = UMat::zeros(imginfo.col, imginfo.row, CV_16SC3);

	//Vignette
	Mat kernel_x, kernel_y, kernel_res;
	kernel_x = cv::getGaussianKernel(imginfo.row, 1000);
	kernel_y = cv::getGaussianKernel(imginfo.col, 1000);
	cv::transpose(kernel_x, kernel_x);
	kernel_res = (kernel_y * kernel_x);
	cv::normalize(kernel_res, kernel_res, 0, 1, NORM_MINMAX);
	imginfo.filter.gaussian_kernel = kernel_res.getUMat(ACCESS_RW);

	//Grain    
	imginfo.filter.grain_mask = UMat::zeros(imginfo.col, imginfo.row, CV_16S);

	cv::randu(imginfo.filter.grain_mask, Scalar(-20), Scalar(20));
	// imginfo.filter.salt_mask = UMat(imginfo.col, imginfo.row, CV_8U);
	// imginfo.filter.pepper_mask = UMat(imginfo.col, imginfo.row, CV_8U);

	//Exposure
	imginfo.filter.exposure_mask = UMat::ones(imginfo.col, imginfo.row, CV_8UC1);



	//*******************************************************************************************************

	// cal minmax
	cv::minMaxIdx(imginfo.filter.bgr_filters[ColorSpaceIndex::B], &imginfo.min_b, &imginfo.max_b);
	cv::minMaxIdx(imginfo.filter.bgr_filters[ColorSpaceIndex::G], &imginfo.min_g, &imginfo.max_g);
	cv::minMaxIdx(imginfo.filter.bgr_filters[ColorSpaceIndex::R], &imginfo.min_r, &imginfo.max_r);

	cv::minMaxIdx(imginfo.filter.hsv_filters[ColorSpaceIndex::H], &imginfo.min_h, &imginfo.max_h);
	cv::minMaxIdx(imginfo.filter.hsv_filters[ColorSpaceIndex::S], &imginfo.min_s, &imginfo.max_s);
	cv::minMaxIdx(imginfo.filter.hsv_filters[ColorSpaceIndex::V], &imginfo.min_v, &imginfo.max_v);

	// init weight and diff matrix
	imginfo.weight.hue = UMat::ones(imginfo.row, imginfo.col, CV_32F);
	imginfo.weight.sat = UMat::ones(imginfo.row, imginfo.col, CV_32F);
	imginfo.weight.val = UMat::ones(imginfo.row, imginfo.col, CV_32F);
	
	imginfo.filter.bgr_filters[ColorSpaceIndex::B] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.bgr_filters[ColorSpaceIndex::G] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.bgr_filters[ColorSpaceIndex::R] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);

	imginfo.filter.hsv_filters[ColorSpaceIndex::H] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hsv_filters[ColorSpaceIndex::S] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);
	imginfo.filter.hsv_filters[ColorSpaceIndex::V] = UMat::zeros(imginfo.row, imginfo.col, CV_16S);

	imginfo.filter.diff = UMat::zeros(imginfo.row, imginfo.col, CV_16S);

	// make weight matrix
	// TO DO

	// TO DO
}

@end
