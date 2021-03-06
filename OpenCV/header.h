#pragma once

#ifdef _WIN32
#include <Windows.h>
#endif

#include <opencv2/opencv.hpp>
#include <opencv2/core/utility.hpp>
#include <opencv2/core/ocl.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>
#include "define.h"

// 색 공간 인덱스
enum class BGR
{
	B,
	G,
	R
};

enum class HSV
{
	H,
	S,
	V
};

enum class HLS
{
	H,
	L,
	S
};

// Utils
double GND(double x, double w, double std, double mu);
void downsize_image(cv::Mat &src, cv::Mat &dst, int downsizedCol, int downsizedRow);
void mouse_callback(int event, int x, int y, int flags, void *userdata);
double weight_per_color(int color, int val);
double weight_per_saturation(int val, int mu);
double weight_per_value(int val, int mu);
void apply_filter();
cv::Mat cut_image(cv::Mat src, int start_x, int start_y, int end_x, int end_y);
cv::Mat get_watermarked_image(cv::Mat src_img, cv::Mat src_logo, int width = 0, int height = 0);
cv::Mat get_preview_image(
	cv::Mat& src_img, cv::Mat src_logo,
	int hue = 0, int saturation = 0, int lightness = 0, int vibrance = 0,
	int highlight_hue = 0, int highlight_sat = 0, int shadow_hue = 0, int shadow_sat = 0,
	int temperature = 0, int tint = 0, int brightness = 0, int grain = 0,
	int clarity = 0, int exposure = 0, int gamma = 0, int vignette = 0, int contrast = 0,
	int width = 0, int height = 0 /* for downsizing */
);

// 작업중인 모든 변수 다 여기에
class WorkingImgInfo
{
public:
	/*********************************************************************
	*	variable and struct
	*********************************************************************/
	int row; // 다운사이징 후 사진 가로
	int col; // 다운사이징 후 사진 세로

	struct Image
	{
		cv::Mat downsized;			// 다운사이징 후 이미지
		cv::UMat bgr, hls, hsv, res; // bgr이미지, hsv이미지, 최종 결과물
		cv::UMat logo;
		std::vector<cv::UMat> bgr_origins; // split한 벡터(bgr)
		std::vector<cv::UMat> hls_origins; // split한 벡터(hls)
	} image;

	struct Filter
	{
		cv::UMat diff;		// 필터 연산을 위한 행렬
		cv::UMat bgr_filter; // bgr변경치가 기록되어 있는 필터
		cv::UMat hls_filter; // hls변경치가 기록되어 있는 필터

		cv::UMat clarity_filter;
		cv::UMat clarity_mask_U;
		cv::UMat clarity_mask_S;
		std::vector<cv::UMat> clarity_mask_split;

		cv::UMat gaussian_kernel;
		cv::UMat gamma_mask;
		cv::UMat grain_mask;
		cv::UMat salt_mask;
		cv::UMat pepper_mask;
		cv::UMat exposure_mask;

		std::vector<cv::UMat> bgr_filters; // split한 벡터(bgr)
		std::vector<cv::UMat> hls_filters; // split한 벡터(hls)
	} filter;

	// 색 검출용 가중치 행렬
	struct Weight
	{
		cv::Mat blue, green, red;
		cv::Mat hue, saturation, lightness;
	} weight;

	// trackbar pos
	// 현재 트랙바 상태 저장한 변수들
	struct Trackbar
	{
		int temperature;
		int hue;
		int saturation;
		int lightness;
		int vibrance;
		int highlight_hue;
		int highlight_sat;

		int shadow_hue;
		int shadow_sat;

		int tint;
		int clarity;
		int exposure;
		int gamma;
		int grain;
		int vignette;

		int contrast;
		int brightness;
	} trackbar;

	/*********************************************************************
	*	method
	*********************************************************************/
	/* first initialize */
  	void update_hue(int pos);
	void update_saturation(int pos);
	void update_lightness(int pos);
	void update_vibrance(int pos);
	void update_highlight_saturation(int pos);
	void update_highlight_hue(int pos);
	void update_shadow_hue(int pos);
	void update_shadow_saturation(int pos);
	void update_temperature(int pos);
	void update_brightness(int pos);
	void update_contrast(int pos);
	void update_tint(int pos);
	void update_clarity(int pos);
	void update_exposure(int pos);
	void update_gamma(int pos);
	void update_grain(int pos);
	void update_vignette(int pos);
	void apply_filter();

	void init_all(cv::Mat &img, int downsized_col, int downsized_row)
	{
		this->originImg = img.clone();
		this->init_image(downsized_col, downsized_row);
		this->init_filter();
		this->init_weight();
		this->init_trackbar(0);

		/* Memory Test */
	}

	/* image initialize */
	void init_image(int downsized_col, int downsized_row)
	{
		/* downsizing */
		downsize_image(this->originImg, this->image.downsized, downsized_col, downsized_row);
		this->row = this->image.downsized.rows;
		this->col = this->image.downsized.cols;

		/* convert */

		this->image.bgr = this->image.downsized.getUMat(cv::ACCESS_RW);
		this->image.res = this->image.bgr.clone();
		if (this->image.bgr.channels() == 4)
		{
			cv::cvtColor(this->image.bgr, this->image.bgr, cv::COLOR_BGRA2BGR);
		}
		cv::cvtColor(this->image.bgr, this->image.hls, cv::COLOR_BGR2HLS);

		// convert 32F
		this->image.bgr.convertTo(this->image.bgr, CV_32FC3);
		this->image.hls.convertTo(this->image.hls, CV_32FC3);
		this->image.hsv.convertTo(this->image.hsv, CV_32FC3);
		this->image.res.convertTo(this->image.res, CV_32FC3);
	}

	/* filter UMatrix initialize */
	void init_filter()
	{
		/* split(original) */
		cv::split(this->image.bgr, this->image.bgr_origins);
		cv::split(this->image.hls, this->image.hls_origins);

		/* delete 0 in hls,hsv image */
		cv::UMat mask;
		cv::inRange(this->image.hls_origins[HLSINDEX::L], 0, 0, mask);
		this->image.hls_origins[HLSINDEX::L].setTo(1, mask);
		cv::inRange(this->image.hls_origins[HLSINDEX::S], 0, 0, mask);
		this->image.hls_origins[HLSINDEX::S].setTo(1, mask);

		/* initialize filter UMatrix */
		this->filter.bgr_filter = cv::UMat::zeros(this->row, this->col, CV_32FC3);
		this->filter.hls_filter = cv::UMat::zeros(this->row, this->col, CV_32FC3);
		this->filter.diff = cv::UMat::zeros(this->row, this->col, CV_32F);

		cv::split(this->filter.bgr_filter, this->filter.bgr_filters);
		cv::split(this->filter.hls_filter, this->filter.hls_filters);
		/*****************************************************************************/
		// Gamma
		this->image.hls_origins[HLSINDEX::L].convertTo(this->filter.gamma_mask, CV_32F);
		cv::multiply(1.0 / 255.0, this->filter.gamma_mask, this->filter.gamma_mask);

		//Clarity
		cv::bilateralFilter(this->image.bgr, this->filter.clarity_filter, DISTANCE, SIGMA_COLOR, SIGMA_SPACE);

		this->filter.clarity_mask_U = cv::UMat::zeros(this->row, this->col, CV_32FC3);
		this->filter.clarity_mask_S = cv::UMat::zeros(this->row, this->col, CV_32FC3);

		//Vignette
		cv::Mat kernel_x, kernel_x_transpose, kernel_y, kernel_res;
		kernel_x = cv::getGaussianKernel(this->col, 1000, CV_32F);
		kernel_y = cv::getGaussianKernel(this->row, 1000, CV_32F);
		cv::transpose(kernel_x, kernel_x_transpose);
		kernel_res = (kernel_y * kernel_x_transpose);
		cv::normalize(kernel_res, kernel_res, 0, 1, cv::NORM_MINMAX);
		cv::subtract(1, kernel_res, kernel_res);
		kernel_res = cv::abs(kernel_res);
		cv::multiply(125, kernel_res, kernel_res);

		this->filter.gaussian_kernel = kernel_res.getUMat(cv::ACCESS_FAST);

		//Grain
		this->filter.grain_mask = cv::UMat::zeros(this->row, this->col, CV_32F);
		cv::randu(this->filter.grain_mask, cv::Scalar(-20), cv::Scalar(20));

		//Exposure
		this->filter.exposure_mask = cv::UMat::ones(this->row, this->col, CV_32F);
	}

	/* make weight UMatrix */
  	void init_weight()
    {
       this->weight.hue = cv::Mat::zeros(this->row, this->col, CV_32F);
       this->weight.saturation = cv::Mat::zeros(this->row, this->col, CV_32F);
       this->weight.lightness = cv::Mat::zeros(this->row, this->col, CV_32F);
      
       double w = 30;
       double mu = 130;
       double std = 10;
       cv::Mat src = this->image.hls_origins[HLSINDEX::L].getMat(cv::ACCESS_RW);
       cv::Mat dest = this->weight.lightness;

       for (int y = 0; y < src.rows; y++) {
         float* pointer_input = src.ptr<float>(y);
         float* pointer_output = dest.ptr<float>(y);
         for (int x = 0; x < src.cols; x++) {
           pointer_output[x] += (w * pow(EXP, -((pointer_input[x] - mu)*(pointer_input[x] - mu)) / (2.0 * std*std)) / sqrt(2.0 * PI*std*std));
         }
       }
       // TO DO
    }

	/* set trackbar pos */
	void init_trackbar(int pos)
	{
		this->trackbar.temperature = pos;
		this->trackbar.hue = pos;
		this->trackbar.saturation = pos;
		this->trackbar.lightness = pos;
		this->trackbar.vibrance = pos;
		this->trackbar.highlight_hue = pos;
		this->trackbar.highlight_sat = pos;
		this->trackbar.shadow_hue = pos;
		this->trackbar.shadow_sat = pos;
		this->trackbar.tint = pos;
		this->trackbar.clarity = pos;
		this->trackbar.exposure = pos;
		this->trackbar.gamma = pos;
		this->trackbar.grain = pos;
		this->trackbar.vignette = pos;
		this->trackbar.contrast = pos;
		this->trackbar.brightness = pos;
	}

	cv::Mat get_origin_img()
	{
		return this->originImg;
	}

	cv::Mat get_res_img()
	{
		cv::Mat res = this->image.res.getMat(cv::ACCESS_FAST);
		this->image.res.convertTo(res,CV_8UC3);
		return res;
	}

	void set_res_img(cv::UMat res)
	{
		this->image.res = res;
	}

	void set_logo_img(cv::UMat logo)
	{
		this->image.logo = logo;
	}

private:
	cv::Mat originImg; // 변경 불가한 원본 이미지(다운사이징 전)
};

/* global variable */
extern WorkingImgInfo imginfo;