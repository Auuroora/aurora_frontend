#include "define.h"
#include "header.h"

using namespace cv;
using namespace std;

void downsize_image(cv::Mat &src, cv::Mat &dst, int downsizedCol, int downsizedRow)
{
  
	if (src.rows > downsizedRow && src.cols > downsizedCol)
	{
		cv::resize(src, dst, cv::Size(downsizedCol, downsizedRow), 0, 0, cv::INTER_AREA);
	}
  	else {
    	dst = src.clone();
 	}
}

cv::Mat cut_image(cv::Mat src, int start_x, int start_y, int end_x, int end_y) {
	cv::Mat dst(src, cv::Rect(start_x, start_y, end_x, end_y));
	return dst;
}

// return img + logo
cv::Mat get_watermarked_image(cv::Mat src_img, cv::Mat src_logo, int width, int height) {
	cv::Mat res_img, res_logo;

  	//cv::Mat src_img = src_img.getMat(cv::ACCESS_FAST);
	cv::resize(src_logo, res_logo, src_img.size(), 0, 0, cv::INTER_AREA);
	cv::addWeighted(src_img, 1, res_logo, 0.7, 0, res_img);

	if (width && height) 
		cv::resize(res_img, res_img, cv::Size(width, height), 0, 0, cv::INTER_AREA);
	return res_img;
}

// return img + logo + filter
cv::Mat get_preview_image(
	cv::Mat& src_img, cv::Mat src_logo,
	int hue, int saturation, int lightness, int vibrance,
	int highlight_hue, int highlight_sat, int shadow_hue, int shadow_sat,
	int temperature, int tint, int brightness, int grain,
	int clarity, int exposure, int gamma, int vignette, int contrast,
	int width, int height /* for downsizing */
) {
	WorkingImgInfo preview_info;
	preview_info.init_all(src_img, width, height);

	preview_info.update_hue(hue);
	preview_info.update_saturation(saturation);
	preview_info.update_lightness(lightness);
	preview_info.update_vibrance(vibrance);
	preview_info.update_highlight_hue(highlight_hue);
	preview_info.update_highlight_saturation(highlight_sat);
	preview_info.update_shadow_hue(shadow_hue);
	preview_info.update_shadow_saturation(shadow_sat);
	preview_info.update_temperature(temperature);
	preview_info.update_tint(tint);
	preview_info.update_brightness(brightness);
	preview_info.update_contrast(contrast);
	preview_info.update_grain(grain);
	preview_info.update_clarity(clarity);
	preview_info.update_exposure(exposure);
	preview_info.update_gamma(gamma);
	preview_info.update_vignette(vignette);

	preview_info.apply_filter();
	return get_watermarked_image(preview_info.image.res.getMat(cv::ACCESS_FAST), src_logo, width, height);
}

/*****************************************************************************
*							applyFilter
*	add bgr filter -> convert to hsv -> add hsv filter -> convert to bgr(res)
*****************************************************************************/
void WorkingImgInfo::apply_filter() {
	// apply hls filter
	cv::merge(this->filter.hls_filters, this->filter.hls_filter);
	cv::add(this->image.hls, this->filter.hls_filter, this->image.res);

	// convert for color space change
	this->image.res.convertTo(this->image.res, CV_8UC3);
	cv::cvtColor(this->image.res, this->image.res, cv::COLOR_HLS2BGR);
	this->image.res.convertTo(this->image.res, CV_32FC3);

	// apply bgr filters
	cv::merge(this->filter.bgr_filters, this->filter.bgr_filter);
	cv::add(this->image.res, this->filter.bgr_filter, this->image.res);
}


void WorkingImgInfo::update_hue(int pos)
{
	this->filter.diff.setTo((pos - this->trackbar.hue)/10.0);
	cv::add(
		this->filter.hls_filters[HLSINDEX::H],
		this->filter.diff,
		this->filter.hls_filters[HLSINDEX::H]);
	this->trackbar.hue = pos;
}

void WorkingImgInfo::update_saturation(int pos)
{
	this->filter.diff.setTo(pos - this->trackbar.saturation);
	cv::add(
		this->filter.hls_filters[HLSINDEX::S],
		this->filter.diff,
		this->filter.hls_filters[HLSINDEX::S]);
	this->trackbar.saturation = pos;
}

void WorkingImgInfo::update_lightness(int pos)
{
	this->filter.diff.setTo(pos - this->trackbar.lightness);
	cv::add(
		this->filter.hls_filters[HLSINDEX::L],
		this->filter.diff,
		this->filter.hls_filters[HLSINDEX::L]);
	this->trackbar.lightness = pos;
}

void WorkingImgInfo::update_temperature(int pos)
{
	this->filter.diff.setTo(abs(this->trackbar.temperature));
	if (this->trackbar.temperature >= 0)
		cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	else
		cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	this->filter.diff.setTo(abs(pos));
	if (pos >= 0)
		cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	else
		cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	this->trackbar.temperature = pos;
}

void WorkingImgInfo::update_vibrance(int pos) {

	cv::addWeighted(
		this->filter.hls_filters[HLSINDEX::S],
		1.0,
		this->weight.lightness,
		(double)(pos - this->trackbar.vibrance),
		0.0,
		this->filter.hls_filters[HLSINDEX::S]
	);
	this->trackbar.vibrance = pos;
  
}

void WorkingImgInfo::update_highlight_hue(int pos)
{
	cv::addWeighted(
		(this->image.hls_origins[HLSINDEX::L]),
		(double)(pos - this->trackbar.highlight_hue) * 0.001,
		this->filter.hls_filters[HLSINDEX::H],
		1,
		0,
		this->filter.hls_filters[HLSINDEX::H]
	);
	// 변경치 업데이트
	this->trackbar.highlight_hue = pos;
}

void WorkingImgInfo::update_highlight_saturation(int pos)
{
	//	cv::Mat s_filter = this->filter.hls_filters[HLSINDEX::S].getMat(cv::ACCESS_FAST);
	//  cv::Mat l_origin = this->image.hls_origins[HLSINDEX::L].getMat(cv::ACCESS_FAST);
    cv::Mat tmp;
	cv::addWeighted(
		this->image.hls_origins[HLSINDEX::L],
		double(pos - this->trackbar.highlight_sat) * 0.01,
		this->filter.hls_filters[HLSINDEX::S],
		1,
		0,
		this->filter.hls_filters[HLSINDEX::S]
	);
	//  this->filter.hls_filters[HLSINDEX::S]= tmp.getUMat(cv::ACCESS_FAST);

	// 변경치 업데이트
	this->trackbar.highlight_sat = pos;
}

void WorkingImgInfo::update_shadow_hue(int pos){
	//	cv::Mat S_filter = this->filter.hls_filters[HLSINDEX::H].getMat(cv::ACCESS_FAST);
    cv::Mat L_origin = this->image.hls_origins[HLSINDEX::L].getMat(cv::ACCESS_FAST); 
	cv::addWeighted(
		this->filter.hls_filters[HLSINDEX::H],
		1.0,
		(1.0 / L_origin),
		(pos - this->trackbar.shadow_hue),
		0,
		this->filter.hls_filters[HLSINDEX::H]
	);

	// 변경치 업데이트
	this->trackbar.shadow_hue = pos;
}

void WorkingImgInfo::update_shadow_saturation(int pos)
{

	cv::Mat S_filter = this->filter.hls_filters[HLSINDEX::S].getMat(cv::ACCESS_FAST);
  	cv::Mat L_origin = this->image.hls_origins[HLSINDEX::L].getMat(cv::ACCESS_FAST);
	cv::addWeighted(
		S_filter,
		1.0,
		(30 / L_origin),
		(pos - this->trackbar.shadow_sat),
		0,
		this->filter.hls_filters[HLSINDEX::S]
	);
	
	// 변경치 업데이트
	this->trackbar.shadow_sat = pos;

}

/*********************************************************************
*	이하 동훈이 코드
*********************************************************************/
void WorkingImgInfo::update_tint(int pos)
{
	this->filter.diff.setTo((pos - this->trackbar.tint) / 5.0);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
	this->trackbar.tint = pos;
}

void WorkingImgInfo::update_clarity(int pos)
{
	double clarity_value;
	clarity_value = this->trackbar.clarity / (double)20.0;

	cv::addWeighted(this->image.bgr, clarity_value, this->filter.clarity_filter, -clarity_value, 0, this->filter.clarity_mask_U);

	cv::addWeighted(this->image.bgr, clarity_value, this->filter.clarity_filter, -clarity_value, 0, this->filter.clarity_mask_U);

	this->filter.clarity_mask_U.convertTo(this->filter.clarity_mask_S, CV_32FC3, 0.5);

	cv::split(this->filter.clarity_mask_S, this->filter.clarity_mask_split);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.clarity_mask_split[BGRINDEX::B], this->filter.bgr_filters[BGRINDEX::B]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.clarity_mask_split[BGRINDEX::G], this->filter.bgr_filters[BGRINDEX::G]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.clarity_mask_split[BGRINDEX::R], this->filter.bgr_filters[BGRINDEX::R]);

	clarity_value = pos / (double)20.0;

	cv::addWeighted(this->image.bgr, clarity_value, this->filter.clarity_filter, -clarity_value, 0, this->filter.clarity_mask_U);
	this->filter.clarity_mask_U.convertTo(this->filter.clarity_mask_S, CV_32FC3, 0.5);
	cv::split(this->filter.clarity_mask_S, this->filter.clarity_mask_split);
	cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.clarity_mask_split[BGRINDEX::B], this->filter.bgr_filters[BGRINDEX::B]);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.clarity_mask_split[BGRINDEX::G], this->filter.bgr_filters[BGRINDEX::G]);
	cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.clarity_mask_split[BGRINDEX::R], this->filter.bgr_filters[BGRINDEX::R]);

	this->trackbar.clarity = pos;
}


void WorkingImgInfo::update_brightness(int brightness_pos)
{
	double a, b;
	if (this->trackbar.contrast > 0)
	{
		double delta = MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (this->trackbar.brightness - delta);
	}
	else
	{
		double delta = -MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * this->trackbar.brightness + delta;
	}

	cv::multiply(this->image.bgr_origins[BGRINDEX::B], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->filter.diff.setTo(b);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	if (this->trackbar.contrast > 0)
	{
		double delta = MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (brightness_pos - delta);
	}
	else
	{
		double delta = -MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * brightness_pos + delta;
	}

	cv::multiply(this->image.bgr_origins[BGRINDEX::B], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->filter.diff.setTo(b);
	cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
	cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->trackbar.brightness = brightness_pos;
}

void WorkingImgInfo::update_contrast(int contrast_pos)
{
	double a, b;
	if (this->trackbar.contrast > 0)
	{
		double delta = MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (this->trackbar.brightness - delta);
	}
	else
	{
		double delta = -MAX_7B_F * this->trackbar.contrast / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * this->trackbar.brightness + delta;
	}

	cv::multiply(this->image.bgr_origins[BGRINDEX::B], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->filter.diff.setTo(b);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
	cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	if (contrast_pos > 0)
	{
		double delta = MAX_7B_F * contrast_pos / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (this->trackbar.brightness - delta);
	}
	else
	{
		double delta = -MAX_7B_F * contrast_pos / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * this->trackbar.brightness + delta;
	}

	cv::multiply(this->image.bgr_origins[BGRINDEX::B], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
	cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->filter.diff.setTo(b);
	cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
	cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
	cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);

	this->trackbar.contrast = contrast_pos;
}

void WorkingImgInfo::update_exposure(int pos)
{
	this->filter.diff.setTo(abs(this->trackbar.exposure));

	if (this->trackbar.exposure >= 0)
	{
		cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
		cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
		cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	}
	else
	{
		cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
		cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
		cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	}

	this->filter.diff.setTo(abs(pos));
	if (pos >= 0)
	{
		cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
		cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
		cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	}
	else
	{
		cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff, this->filter.bgr_filters[BGRINDEX::B]);
		cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff, this->filter.bgr_filters[BGRINDEX::G]);
		cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff, this->filter.bgr_filters[BGRINDEX::R]);
	}
	this->trackbar.exposure = pos;
}

// float 처리를 해야 가능
void WorkingImgInfo::update_gamma(int pos)
{
	this->filter.diff = this->filter.gamma_mask.clone();

	cv::pow(this->filter.diff, -this->trackbar.gamma / 1000.0, this->filter.diff);
	cv::multiply(255, this->filter.diff, this->filter.diff);
	cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);

	this->trackbar.gamma = pos;
	this->filter.diff = this->filter.gamma_mask.clone();
	
	cv::pow(this->filter.diff, -pos / 1000.0, this->filter.diff);
	cv::multiply(255, this->filter.diff, this->filter.diff);
	cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);

	this->trackbar.gamma = pos;
}

void WorkingImgInfo::update_grain(int pos)
{
	this->filter.diff = this->filter.grain_mask.clone();

	cv::multiply(this->filter.diff, (pos - this->trackbar.grain) / 30.0, this->filter.diff);
	cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);

	this->trackbar.grain = pos;
}

void WorkingImgInfo::update_vignette(int pos)
{
	this->filter.diff = this->filter.gaussian_kernel.clone();

	// 양이 밝게 , 음이 어둡게
	cv::multiply(this->filter.diff, abs(this->trackbar.vignette) * 0.01, this->filter.diff);
	if (this->trackbar.vignette > 0)
	{
		cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);
	}
	else if (this->trackbar.vignette < 0)
	{
		cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);
	}

	this->filter.diff = this->filter.gaussian_kernel.clone();
	cv::multiply(this->filter.diff, abs(pos) * 0.01, this->filter.diff);
	if (pos > 0)
	{
		cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);
	}
	else if (pos < 0)
	{
		cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff, this->filter.hls_filters[HLSINDEX::L]);
	}

	this->trackbar.vignette = pos;
}
