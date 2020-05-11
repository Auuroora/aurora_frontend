#import <opencv2/opencv.hpp>

#if TARGET_IPHONE_SIMULATOR
#undef NO
#elif TARGET_OS_IPHONE
#undef NO
#endif

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif
/* 
#import <opencv2/imgproc/imgproc.hpp>
#import <opencv2/core/utility.hpp>

using namespace cv;
using namespace std;

class WorkingImgInfo {
private:
public:
	double min_hue, max_hue;
	double min_sat, max_sat;
	double min_val, max_val;
	double min_r, max_r;
	double min_g, max_g;
	double min_b, max_b;

	WorkingImgInfo() {};

	Mat originImg;

	Mat bgrImg, hsvImg, resImg;

	Mat bgrSplit[3], hsvSplit[3];

	struct Filter {
		Mat blue;
		Mat green;
		Mat red;
		Mat hue;
		Mat sat;
		Mat val;
	} filter;

	struct Weight {
		Mat blue;
		Mat green;
		Mat red;
		Mat hue;
		Mat sat;
		Mat val;
	} weight;

	struct Trackbar {
		struct HSV {
			struct Hue {
				int	red = 0, orange = 0, yellow = 0, 
					green = 0, blue = 0, violet = 0;
			} hue;

			struct Sat {
				int	red = 0, orange = 0, yellow = 0,
					green = 0, blue = 0, violet = 0;
			} sat;

			struct Val {
				int	red = 0, orange = 0, yellow = 0,
					green = 0, blue = 0, violet = 0;
			} val;
		} hsv;

		struct Color {
			int temperature = 0;
			int tint = 0;
			int hue;
			int sat = 0;
			int val = 0;
			int vibrance = 0;
		} color;

		struct SplitTone {
			int highlight = 0;
		} splittone;

	} trackbar;

	Mat getResImg(){
		return this->resImg;
	}

};

class ParallelModulo : public ParallelLoopBody {
private:
	Mat &src;
	Mat &dst;
	short* dataSrc;
	short* dataDst;
	int mod;

public:
	ParallelModulo(Mat &src, Mat &dst, int mod) : src(src), dst(dst), mod(mod) {
		dataSrc = (short*)src.data;
		dataDst = (short*)dst.data;
	}

	virtual void operator ()(const Range& range) const CV_OVERRIDE {
		for (int r = range.start; r < range.end; r++) {
			dataDst[r] = (dataSrc[r] < 0 ? dataSrc[r] + mod : dataSrc[r] % mod);
		}
	}

	ParallelModulo& operator=(const ParallelModulo &) {
		return *this;
	};
};

class ParallelMakeWeight : public ParallelLoopBody {
private:
	Mat &origin;
	Mat &weighMatrix;
	double min, max;
	double(*weightFunc)(int, int);

public:
	ParallelMakeWeight(Mat &i, Mat &w, double(*wF)(int, int)) : origin(i), weighMatrix(w), weightFunc(wF) {
		cv::minMaxIdx(origin, &min, &max);
	}

	virtual void operator ()(const Range& range) const CV_OVERRIDE {
		for (int r = range.start; r < range.end; r++) {
			weighMatrix.data[r] = 10.0;//weightFunc((int)origin.data[r], max);
		}
	}

	ParallelMakeWeight& operator=(const ParallelMakeWeight &) {
		return *this;
	};
};

// core.cpp
double GND(double x, double w, double std, double mu);
double weightPerColor(int color, int val);
double weightPerSaturation(int val, int mu);
double weightPerValue(int val, int mu);
void updateHue(int pos);
void updateSaturation(int pos);
void updateValue(int pos);
void updateTemperature(int pos);
void updateVibrance();
void updateHighlightSaturation();
void updateHighlightHue();
void applyFilter();

// callback
void mouseCallback(int event, int x, int y, int flags, void *userdata);
void onChangeHue(int pos, void* ptr);
void onChangeSaturation(int v, void* ptr);
void onChangeValue(int v, void* ptr);
void onChangeTemperature(int v, void* ptr);
void onChangeVibrance(int v, void* ptr);
void onChangeHighlight(int curPos, void* ptr);


// �׽�Ʈ��
void onChangeColorFilter(int curPos, void* ptr);

extern WorkingImgInfo imginfo; */

@interface RNOpenCvLibrary : NSObject <RCTBridgeModule>

@end
