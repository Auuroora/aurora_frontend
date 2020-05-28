#include "define.h"
#include "header.h"

using namespace cv;
using namespace std;

double GND(double x, double w, double std, double mu = 0)
{
	return w * pow(EXP, -((x - mu) * (x - mu)) / (2 * std * std)) / sqrt(2 * PI * std * std);
}

double weight_per_color(int color, int val)
{
	if (color == RED && val > 160)
		val -= 180;

	switch (color)
	{
	case RED:
		if (val < 0)
			return GND(abs(color - val), 80.0, 9.0);
		else
			return GND(abs(color - val), 40.0, 4.5);

	case ORANGE:
		return GND(abs(color - val), 45.0, 7.0);
	case YELLOW:
		return GND(abs(color - val), 40.0, 7.5);
	case GREEN:
		return GND(abs(color - val), 120, 14);
	case BLUE:
		return GND(abs(color - val), 120, 14);
	case VIOLET:
		return GND(abs(color - val), 110, 12);
	}
	return 0;
}

double weight_per_saturation(int val, int mu)
{
	return GND((double)val, 200.0, 50.0, (double)mu);
}

double weight_per_value(int val, int mu)
{
	return GND((double)val, 200.0, 50.0, (double)mu);
}

void downsize_image(cv::Mat &src, cv::Mat &dst, int downsizedCol, int downsizedRow)
{
	if (src.rows > downsizedRow || src.cols > downsizedCol)
	{
		cv::resize(src, dst, cv::Size(downsizedCol, downsizedRow), 0, 0, cv::INTER_AREA);
	}
	else
	{
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

	cv::resize(src_logo, res_logo, src_img.size(), 0, 0, cv::INTER_AREA);
	cv::addWeighted(src_img, 1, res_logo, 0.3, 0, res_img);

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
	int clarity, int exposure, int gamma, int vignette, int constrast,
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
	//preview_info.update_brightness_and_constrast(brightness);
	preview_info.update_grain(grain);
	preview_info.update_clarity(clarity);
	preview_info.update_exposure(exposure);
	//preview_info.update_gamma(gamma); std::cout << "hiii\n";
	preview_info.update_vignette(vignette);
	//preview_info.update_brightness_and_constrast(constrast);

	preview_info.apply_filter();
	return get_watermarked_image(preview_info.image.res, src_logo, width, height);
}

/*****************************************************************************
*							applyFilter
*	add bgr filter -> convert to hsv -> add hsv filter -> convert to bgr(res)
*****************************************************************************/
void apply_filter()
{
   imginfo.image.hls.convertTo(imginfo.image.hls, CV_16SC3);
   imginfo.image.bgr.convertTo(imginfo.image.bgr, CV_16SC3);
   
   // hls
   cv::merge(imginfo.filter.hls_filters, imginfo.filter.hls_filter);
   imginfo.image.res.convertTo(imginfo.image.res, CV_16SC3);
   cv::add(imginfo.image.hls, imginfo.filter.hls_filter, imginfo.image.res); /**/
   imginfo.image.res.convertTo(imginfo.image.res, CV_8UC3);

   // bgr
   cv::cvtColor(imginfo.image.res, imginfo.image.res, cv::COLOR_HLS2BGR);
   cv::merge(imginfo.filter.bgr_filters, imginfo.filter.bgr_filter);

   imginfo.image.res.convertTo(imginfo.image.res, CV_16SC3);
   cv::add(imginfo.image.res, imginfo.filter.bgr_filter, imginfo.image.res);
   imginfo.image.res.convertTo(imginfo.image.res, CV_8UC3);

   imginfo.image.bgr.convertTo(imginfo.image.bgr, CV_8UC3);
   imginfo.image.hls.convertTo(imginfo.image.hls, CV_8UC3);
}

void update_hue(int pos)
{
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.hue);
	cv::add(
		imginfo.filter.hls_filters[HLSINDEX::H],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HLSINDEX::H]);
	imginfo.trackbar.hue = pos;
}

void update_saturation(int pos)
{
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.saturation);
	cv::add(
		imginfo.filter.hls_filters[HLSINDEX::S],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HLSINDEX::S]);
	imginfo.trackbar.saturation = pos;
}

void update_lightness(int pos)
{
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.lightness);
	cv::add(
		imginfo.filter.hls_filters[HLSINDEX::L],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HLSINDEX::L]);
	imginfo.trackbar.lightness = pos;
}

void update_temperature(int pos)
{
	imginfo.filter.diff.setTo(abs(imginfo.trackbar.temperature));
	if (imginfo.trackbar.temperature >= 0)
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	else
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);

	imginfo.filter.diff.setTo(abs(pos));
	if (pos >= 0)
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	else
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);

	imginfo.trackbar.temperature = pos;
}

void update_vibrance(int pos)
{
	cv::Mat w;
	cv::divide(
		imginfo.image.hls_origins[HLSINDEX::L],
		imginfo.image.hls_origins[HLSINDEX::S],
		w,
		(double)(pos - imginfo.trackbar.vibrance) * 0.05,
		CV_16S);
	cv::add(
		imginfo.filter.hls_filters[HLSINDEX::S],
		w,
		imginfo.filter.hls_filters[HLSINDEX::S]);

	// 변경치 업데이트
	imginfo.trackbar.vibrance = pos;
}

void update_highlight_hue(int pos)
{
	cv::Mat tmp = imginfo.filter.hls_filters[HLSINDEX::H].clone();
	cv::addWeighted(
		(imginfo.image.hls_origins[HLSINDEX::L]),
		(double)(pos - imginfo.trackbar.highlight_hue) * 0.001,
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSINDEX::H],
		CV_16S);

	// 변경치 업데이트
	imginfo.trackbar.highlight_hue = pos;
}

void update_highlight_saturation(int pos)
{
	cv::Mat tmp = imginfo.filter.hls_filters[HLSINDEX::S].clone();
	cv::addWeighted(
		(imginfo.image.hls_origins[HLSINDEX::L]),
		double(pos - imginfo.trackbar.highlight_sat) * 0.01,
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSINDEX::S],
		CV_16S);

	// 변경치 업데이트
	imginfo.trackbar.highlight_sat = pos;
}

void update_shadow_hue(int pos)
{
	cv::Mat tmp = imginfo.filter.hls_filters[HLSINDEX::H].clone();
	cv::Mat tmp2;
	cv::divide(15, imginfo.image.hls_origins[HLSINDEX::L], tmp2, CV_32F);

	cv::addWeighted(
		(tmp2),
		double(pos - imginfo.trackbar.highlight_hue),
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSINDEX::H],
		CV_16S);

	// 변경치 업데이트
	imginfo.trackbar.highlight_hue = pos;
}

void update_shadow_saturation(int pos)
{
	cv::Mat tmp = imginfo.filter.hls_filters[HLSINDEX::S].clone();
	cv::addWeighted(
		(100 / (imginfo.image.hls_origins[HLSINDEX::L])),
		(pos - imginfo.trackbar.highlight_sat),
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSINDEX::S],
		CV_16S);

	// 변경치 업데이트
	imginfo.trackbar.highlight_sat = pos;
}

/*********************************************************************
*	이하 동훈이 코드
*********************************************************************/
void update_tint(int pos)
{
	imginfo.filter.diff.setTo((pos - imginfo.trackbar.tint) / 5.0);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
	imginfo.trackbar.tint = pos;
}

void update_clarity(int pos)
{
	double clarity_value;
	clarity_value = imginfo.trackbar.clarity / (double)10.0;

	cv::addWeighted(imginfo.image.bgr, clarity_value, imginfo.filter.clarity_filter, -clarity_value, 0, imginfo.filter.clarity_mask_U);
	imginfo.filter.clarity_mask_U.convertTo(imginfo.filter.clarity_mask_S, CV_16SC3, 0.8);
	// cout<<imginfo.filter.clarity_mask_U.type()<<endl;
	cv::split(imginfo.filter.clarity_mask_S, imginfo.filter.clarity_mask_split);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.clarity_mask_split[BGRINDEX::B], imginfo.filter.bgr_filters[BGRINDEX::B]);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.clarity_mask_split[BGRINDEX::G], imginfo.filter.bgr_filters[BGRINDEX::G]);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.clarity_mask_split[BGRINDEX::R], imginfo.filter.bgr_filters[BGRINDEX::R]);

	clarity_value = pos / (double)10.0;

	cv::addWeighted(imginfo.image.bgr, clarity_value, imginfo.filter.clarity_filter, -clarity_value, 0, imginfo.filter.clarity_mask_U);
	// cout<<imginfo.filter.clarity_mask_U.type()<<endl;
	imginfo.filter.clarity_mask_U.convertTo(imginfo.filter.clarity_mask_S, CV_16SC3, 0.8);
	cv::split(imginfo.filter.clarity_mask_S, imginfo.filter.clarity_mask_split);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.clarity_mask_split[BGRINDEX::B], imginfo.filter.bgr_filters[BGRINDEX::B]);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.clarity_mask_split[BGRINDEX::G], imginfo.filter.bgr_filters[BGRINDEX::G]);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.clarity_mask_split[BGRINDEX::R], imginfo.filter.bgr_filters[BGRINDEX::R]);

	imginfo.trackbar.clarity = pos;
}

// Refactoring : a,b 구하는건 함수로
void update_brightness_and_constrast(int brightness_pos, int constrast_pos)
{
	double a, b;
	if (imginfo.trackbar.constrast > 0)
	{
		double delta = MAX_7B_F * imginfo.trackbar.constrast / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (imginfo.trackbar.brightness - delta);
	}
	else
	{
		double delta = -MAX_7B_F * imginfo.trackbar.constrast / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * imginfo.trackbar.brightness + delta;
	}

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::B], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::G], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::R], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);

	imginfo.filter.diff.setTo(b);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
	cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);

	if (constrast_pos > 0)
	{
		double delta = MAX_7B_F * constrast_pos / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (brightness_pos - delta);
	}
	else
	{
		double delta = -MAX_7B_F * constrast_pos / MAX_8B_F;
		a = (MAX_8B_F - delta * 2) / MAX_8B_F;
		b = a * brightness_pos + delta;
	}

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::B], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::G], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);

	cv::multiply(imginfo.image.bgr_origins[BGRINDEX::R], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);

	imginfo.filter.diff.setTo(b);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
	cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);

	imginfo.trackbar.brightness = brightness_pos;
	imginfo.trackbar.constrast = constrast_pos;
}

void update_exposure(int pos)
{
	imginfo.filter.diff.setTo(abs(imginfo.trackbar.exposure));

	if (imginfo.trackbar.exposure >= 0)
	{
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	}
	else
	{
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	}

	imginfo.filter.diff.setTo(abs(pos));
	if (pos >= 0)
	{
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
		cv::add(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	}
	else
	{
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::B]);
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::G]);
		cv::subtract(imginfo.filter.bgr_filters[BGRINDEX::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRINDEX::R]);
	}
	imginfo.trackbar.exposure = pos;
}

// float 처리를 해야 가능
void update_gamma(int pos)
{
	imginfo.filter.diff = imginfo.filter.gamma_mask.clone();

	cv::pow(imginfo.filter.diff, -imginfo.trackbar.gamma / 100.0, imginfo.filter.diff);
	cv::multiply(255, imginfo.filter.diff, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::subtract(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);

	imginfo.filter.diff = imginfo.filter.gamma_mask.clone();

	cv::pow(imginfo.filter.diff, -pos / 100.0, imginfo.filter.diff);
	cv::multiply(255, imginfo.filter.diff, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::add(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);

	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);

	imginfo.trackbar.gamma = pos;
}

void update_grain(int pos)
{
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_32F);
	imginfo.filter.diff = imginfo.filter.grain_mask.clone();

	cv::multiply(imginfo.filter.diff, (pos - imginfo.trackbar.grain) / 5.0, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff, CV_16S);
	cv::add(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);

	imginfo.trackbar.grain = pos;
}

void update_vignette(int pos)
{
	imginfo.filter.diff = imginfo.filter.gaussian_kernel.clone();

	// 양이 밝게 , 음이 어둡게
	cv::multiply(imginfo.filter.diff, abs(imginfo.trackbar.vignette) * 0.01, imginfo.filter.diff);
	if (imginfo.trackbar.vignette > 0)
	{
		cv::subtract(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);
	}
	else if (imginfo.trackbar.vignette < 0)
	{
		cv::add(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);
	}

	imginfo.filter.diff = imginfo.filter.gaussian_kernel.clone();
	cv::multiply(imginfo.filter.diff, abs(pos) * 0.01, imginfo.filter.diff);
	if (pos > 0)
	{
		cv::add(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);
	}
	else if (pos < 0)
	{
		cv::subtract(imginfo.filter.hls_filters[HLSINDEX::L], imginfo.filter.diff, imginfo.filter.hls_filters[HLSINDEX::L]);
	}

	imginfo.trackbar.vignette = pos;
}