#include "define.h"
#include "header.h"

using namespace cv;
using namespace std;

double GND(double x, double w, double std, double mu = 0) {
	return w * pow(EXP, -((x - mu)*(x - mu)) / (2*std*std)) / sqrt(2*PI*std*std);
}

double weightPerColor(int color, int val) {
	if (color == RED && val > 160) val -= 180;

	switch (color) {
	case RED:
		if(val < 0) return GND(abs(color - val), 80.0, 9.0);
		else return GND(abs(color - val), 40.0, 4.5);
		
	case ORANGE:	return GND(abs(color - val), 45.0, 7.0);
	case YELLOW:	return GND(abs(color - val), 40.0, 7.5);
	case GREEN:		return GND(abs(color - val), 120, 14);
	case BLUE:		return GND(abs(color - val), 120, 14);
	case VIOLET:	return GND(abs(color - val), 110, 12);
	}
	return 0;
}

double weightPerSaturation(int val, int mu) {
	return GND((double)val, 300.0, 100.0, (double)mu);
}

double weightPerValue(int val, int mu) {
	return GND((double)val, 300.0, 100.0, (double)mu);
}

/*****************************************************************************
*							applyFilter
*	add bgr filter -> convert to hsv -> add hsv filter -> convert to bgr(res)
*****************************************************************************/
void applyFilter() {
	Mat bgrFilters[] = {
		imginfo.filter.blue,
		imginfo.filter.green,
		imginfo.filter.red,
		imginfo.filter.alpha
	};
	Mat hsvFilters[] = {
		imginfo.filter.hue,
		imginfo.filter.sat,
		imginfo.filter.val
	};
	Mat hsvFilter, bgrFilter;

	// apply BGR 
	imginfo.bgrImg.convertTo(imginfo.bgrImg, CV_16SC4);
	cv::merge(bgrFilters, 4, bgrFilter);
	cv::add(imginfo.bgrImg, bgrFilter, imginfo.resImg);
	imginfo.resImg.convertTo(imginfo.resImg, CV_8UC4);

	// apply HSV
	//cv:cvtColor(imginfo.resImg, imginfo.resImg, COLOR_BGR2HSV);
	//imginfo.resImg.convertTo(imginfo.resImg, CV_16SC4);
	//cv::merge(hsvFilters, 3, hsvFilter);
	//cv::add(imginfo.resImg, hsvFilter, imginfo.resImg);
	//imginfo.resImg.convertTo(imginfo.resImg, CV_8UC4);

	//cv::cvtColor(imginfo.resImg, imginfo.resImg, COLOR_HSV2BGR);
}

void updateHue(int pos) {
	//Mat diff = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S) * (pos - imginfo.trackbar.color.hue);
	//
	//cv::add(imginfo.filter.hue, diff, imginfo.filter.hue);
	//imginfo.trackbar.color.hue = pos;

	//cv::parallel_for_(Range(0, imginfo.originImg.rows * imginfo.originImg.cols), ParallelModulo(splitImg[H], splitImg[H], (HUE_MAX + 1)));	
}

void updateSaturation(int pos) {
	printf("%d",imginfo.trackbar.color.sat);
	Mat diff = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S) * (pos - imginfo.trackbar.color.sat);
	cv::add(imginfo.filter.sat, diff, imginfo.filter.sat);
	imginfo.trackbar.color.sat = pos;
}

void updateValue(int pos) {
	Mat diff = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S) * (pos - imginfo.trackbar.color.val);
	cv::add(imginfo.filter.val, diff, imginfo.filter.val);
	imginfo.trackbar.color.val = pos;
}

void updateTemperature(int pos) {
	Mat before = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S) * abs(imginfo.trackbar.color.temperature);
	Mat after = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_16S) * abs(pos);

	if (imginfo.trackbar.color.temperature >= 0) 
		cv::subtract(imginfo.filter.red, before, imginfo.filter.red);
	else 
		cv::subtract(imginfo.filter.blue, before, imginfo.filter.blue);
	
	if (pos >= 0)
		cv::add(imginfo.filter.red, after, imginfo.filter.red);
	else
		cv::add(imginfo.filter.blue, after, imginfo.filter.blue);

	imginfo.trackbar.color.temperature = pos;
}


void updateVibrance() {
	//int len = imginfo.originImg.rows * imginfo.originImg.cols;
	//ParallelChangeVibrance parallelChangeVibrance(imginfo.originHsvSplit[S], imginfo.filterHsvSplit[S]);
	//cv::parallel_for_(Range(0, len), parallelChangeVibrance);
}

void updateHighlightHue() {
	//Mat add = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_32F) * (double)imginfo.trackbar.splittone.highlight;

	//add = add.mul(imginfo.weightMatrixPerValue);
	//add.convertTo(add, CV_8U);

	//cv::add(imginfo.originHsvSplit[H], add, imginfo.filterHsvSplit[H]);
}

void updateHighlightSaturation() {
	//Mat add = Mat::ones(imginfo.originImg.rows, imginfo.originImg.cols, CV_32F) * (double)imginfo.trackbar.splittone.highlight;

	//add = add.mul(imginfo.weightMatrixPerValue);
	//add.convertTo(add, CV_8U);

	//cv::add(imginfo.originHsvSplit[S], add, imginfo.filterHsvSplit[S]);
}
