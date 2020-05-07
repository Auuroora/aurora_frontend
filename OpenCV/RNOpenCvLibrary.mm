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

RCT_EXPORT_METHOD(onChangeTemperature: (NSInteger)value callback:(RCTResponseSenderBlock)callback) {
  NSLog(@"%d", (int)value);
  Mat resImg = onUpdateTemperature((int)value);
  
  UIImage* result = MatToUIImage(resImg);
  
  NSData *imageData = UIImageJPEGRepresentation(result, 1.0);
  NSString *encodedString = [imageData base64Encoding];
  callback(@[[NSNull null], encodedString]);
}

Mat onUpdateTemperature(int curPos) {
  NSLog(@"rows: %d", imginfo.originImg.rows);
  NSLog(@"cols: %d", imginfo.originImg.cols);
  NSLog(@"channels: %d", imginfo.originImg.channels());
  NSLog(@"type: %d", imginfo.originImg.type());
  
	updateTemperature(curPos);
	applyFilter();
  return imginfo.getResImg();
}

- (UIImage *)decodeBase64ToImage:(NSString *)strEncodeData {
  NSData *data = [[NSData alloc]initWithBase64EncodedString:strEncodeData options:NSDataBase64DecodingIgnoreUnknownCharacters];
  return [UIImage imageWithData:data];
}

void init(Mat &img){
	imginfo.originImg = img.clone();
	imginfo.bgrImg = img.clone();
	imginfo.resImg = img.clone();

	//cvtColor(imginfo.originImg, imginfo.hsvImg, COLOR_BGR2HSV);

	//split(imginfo.bgrImg, imginfo.bgrSplit);
	//split(imginfo.hsvImg, imginfo.hsvSplit);

	imginfo.weight.hue = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_32F);
	imginfo.weight.sat = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_32F);
	imginfo.weight.val = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_32F);
	
	imginfo.filter.blue = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);
	imginfo.filter.green = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);
	imginfo.filter.red = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);
  imginfo.filter.alpha = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);

	imginfo.filter.hue = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);
	imginfo.filter.sat = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);
	imginfo.filter.val = Mat::zeros(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S);

	// make weight matrix
	// TO DO
}

@end
