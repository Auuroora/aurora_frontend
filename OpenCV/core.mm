#include "define.h"
#include "header.h"

using namespace cv;
using namespace std;
using namespace BGR;
using namespace HSV;
using namespace HLS;


void downsize_image(Mat &src, Mat &dst, int downsizing_row, int downsizing_col) {
	if (src.rows > downsizing_row || src.cols > downsizing_col) {
		cv::resize(src, dst, Size(downsizing_row, downsizing_col), 0, 0, INTER_AREA);
	}
	else {
		dst = src.clone();
	}
}

/*****************************************************************************
*							apply_filter
*	add bgr filter -> convert to hsv -> add hsv filter -> convert to bgr(res)
********************************************************************************/

void apply_filter() {
	switch (imginfo.changed_color_space) {
	case BGR_CHANGED:
		imginfo.image.bgr.convertTo(imginfo.image.bgr, CV_16SC3);
		cv::merge(imginfo.filter.bgr_filters, imginfo.filter.bgr_filter);
		cv::add(imginfo.image.bgr, imginfo.filter.bgr_filter, imginfo.image.res);
		imginfo.image.res.convertTo(imginfo.image.res, CV_8UC3);
		break;

	case HLS_CHANGED:
		imginfo.image.hls.convertTo(imginfo.image.res, CV_16SC3);
		cv::merge(imginfo.filter.hls_filters, imginfo.filter.hls_filter);
		cv::add(imginfo.image.res, imginfo.filter.hls_filter, imginfo.image.res);
		imginfo.image.res.convertTo(imginfo.image.res, CV_8UC3);
		cv::cvtColor(imginfo.image.res, imginfo.image.res, COLOR_HLS2BGR);
		break;

	case HSV_CHANGED:
		imginfo.image.hsv.convertTo(imginfo.image.res, CV_16SC3);
		cv::merge(imginfo.filter.hsv_filters, imginfo.filter.hsv_filter);
		cv::add(imginfo.image.res, imginfo.filter.hsv_filter, imginfo.image.res);
		imginfo.image.res.convertTo(imginfo.image.res, CV_8UC3);
		cv::cvtColor(imginfo.image.res, imginfo.image.res, COLOR_HSV2BGR);
		break;
	}
}

void update_hue(int pos) {
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.hue);
	cv::add(
		imginfo.filter.hls_filters[HSVIndex::H],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HSVIndex::H]
	);
	imginfo.trackbar.hue = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_saturation(int pos) {
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.saturation);
	cv::add(
		imginfo.filter.hls_filters[HLSIndex::S],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HLSIndex::S]
	);
	imginfo.trackbar.saturation = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_lightness(int pos) {
	imginfo.filter.diff.setTo(pos - imginfo.trackbar.lightness);
	cv::add(
		imginfo.filter.hls_filters[HLSIndex::L],
		imginfo.filter.diff,
		imginfo.filter.hls_filters[HLSIndex::L]
	);
	imginfo.trackbar.lightness = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_temperature(int pos) {
	imginfo.filter.diff.setTo(abs(imginfo.trackbar.temperature));
	if (imginfo.trackbar.temperature >= 0)
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	else
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);

	imginfo.filter.diff.setTo(abs(pos));
	if (pos >= 0)
		cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	else
		cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);

	imginfo.trackbar.temperature = pos;
	imginfo.changed_color_space = BGR_CHANGED;
}

void update_vibrance(int pos) {
	Mat mask;
	Mat tmp = imginfo.image.hsv_origins[HSVIndex::S].clone();
	tmp.convertTo(tmp, CV_16S);

	cv::add(
		tmp,
		imginfo.filter.hsv_filters[HSVIndex::S],
		tmp
	);

	cv::inRange(tmp, 0, 100, mask);
	cv::addWeighted(
		(100 / (imginfo.image.hsv_origins[HSVIndex::S])),
		(pos - imginfo.trackbar.vibrance),
		0,
		0,
		0,
		imginfo.filter.diff,
		CV_16S
	);
	cv::add(
		imginfo.filter.hsv_filters[HSVIndex::S],
		imginfo.filter.diff,
		imginfo.filter.hsv_filters[HSVIndex::S],
		mask
	);

	//Mat tmp = imginfo.filter.hsv_filters[HSVIndex::Sat].clone();
	//cv::addWeighted(
	//	(30 / (imginfo.image.hsv_origins[HSVIndex::Sat])),
	//	(pos - imginfo.trackbar.vibrance),
	//	tmp,
	//	1,
	//	0,
	//	imginfo.filter.hsv_filters[HSVIndex::Sat],
	//	CV_16S
	//);

	// 변경치 업데이트
	imginfo.trackbar.vibrance = pos;
	imginfo.changed_color_space = HSV_CHANGED;
}

void update_highlight_hue(int pos) {
	Mat tmp = imginfo.filter.hls_filters[HLSIndex::H].clone();
	cv::addWeighted(
		(imginfo.image.hls_origins[HLSIndex::L]),
		(double)(pos - imginfo.trackbar.highlight_hue) * 0.001,
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSIndex::H],
		CV_16S
	);

	// 변경치 업데이트
	imginfo.trackbar.highlight_hue = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_highlight_saturation(int pos) {
	Mat tmp = imginfo.filter.hls_filters[HLSIndex::S].clone();
	cv::addWeighted(
		(imginfo.image.hls_origins[HLSIndex::L]),
		double(pos - imginfo.trackbar.highlight_sat) * 0.01,
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSIndex::S],
		CV_16S
	);

	// 변경치 업데이트
	imginfo.trackbar.highlight_sat = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_shadow_hue(int pos) {
	Mat tmp = imginfo.filter.hls_filters[HLSIndex::H].clone();
	Mat tmp2;
	cv::divide(15, imginfo.image.hls_origins[HLSIndex::L], tmp2, CV_32F);

	cv::addWeighted(
		(tmp2),
		double(pos - imginfo.trackbar.highlight_hue),
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSIndex::H],
		CV_16S
	);

	// 변경치 업데이트
	imginfo.trackbar.highlight_hue = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

void update_shadow_saturation(int pos) {
	Mat tmp = imginfo.filter.hls_filters[HLSIndex::S].clone();
	cv::addWeighted(
		(100 / (imginfo.image.hls_origins[HLSIndex::L])),
		(pos - imginfo.trackbar.highlight_sat),
		tmp,
		1,
		0,
		imginfo.filter.hls_filters[HLSIndex::S],
		CV_16S
	);

	// 변경치 업데이트
	imginfo.trackbar.highlight_sat = pos;
	imginfo.changed_color_space = HLS_CHANGED;
}

/*********************************************************************
*	이하 동훈이 코드 
**************************************************************/

void update_tint(int pos)
{
	imginfo.filter.diff.setTo((pos - imginfo.trackbar.tint)/5.0);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
	imginfo.trackbar.tint = pos;
	imginfo.changed_color_space = BGR_CHANGED;
}

void update_clarity(int pos)
{	
	double clarity_value;
	clarity_value = imginfo.trackbar.clarity/(double)10.0;

	cv::addWeighted(imginfo.image.downsized,clarity_value,imginfo.filter.clarity_filter,-clarity_value,0,imginfo.filter.clarity_mask_U);
	// cout<<imginfo.filter.clarity_mask_U.type()<<endl;
	cv::split(imginfo.filter.clarity_mask_S,imginfo.filter.clarity_mask_split);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.clarity_mask_split[BGRIndex::B], imginfo.filter.bgr_filters[BGRIndex::B]);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.clarity_mask_split[BGRIndex::G], imginfo.filter.bgr_filters[BGRIndex::G]);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.clarity_mask_split[BGRIndex::R], imginfo.filter.bgr_filters[BGRIndex::R]);


	clarity_value = pos/(double)10.0;

	cv::addWeighted(imginfo.image.downsized,clarity_value,imginfo.filter.clarity_filter,-clarity_value,0,imginfo.filter.clarity_mask_U);
	// cout<<imginfo.filter.clarity_mask_U.type()<<endl;
	imginfo.filter.clarity_mask_U.convertTo(imginfo.filter.clarity_mask_S,CV_16SC3,0.8);
	cv::split(imginfo.filter.clarity_mask_S,imginfo.filter.clarity_mask_split);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.clarity_mask_split[BGRIndex::B], imginfo.filter.bgr_filters[BGRIndex::B]);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.clarity_mask_split[BGRIndex::G], imginfo.filter.bgr_filters[BGRIndex::G]);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.clarity_mask_split[BGRIndex::R], imginfo.filter.bgr_filters[BGRIndex::R]);

	imginfo.trackbar.clarity=pos;
	imginfo.changed_color_space = BGR_CHANGED;
}

// Refactoring : a,b 구하는건 함수로
void update_brightness_and_constrast(int brightness_pos, int constrast_pos)
{
	double a, b;
	cout<<brightness_pos<<"&"<<constrast_pos<<endl;
	if (imginfo.trackbar.constrast > 0)
	{
		double delta = MAX_7B_F * imginfo.trackbar.constrast / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (imginfo.trackbar.brightness - delta);
	}
	else
	{
		double delta = -MAX_7B_F  * imginfo.trackbar.constrast / MAX_8B_F;
		a = (MAX_8B_F- delta * 2) / MAX_8B_F;
		b = a * imginfo.trackbar.brightness + delta;
	}

	cv::multiply(imginfo.image.bgr_origins[BGRIndex::B], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);


	cv::multiply(imginfo.image.bgr_origins[BGRIndex::G], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);

	cv::multiply(imginfo.image.bgr_origins[BGRIndex::R], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);

	imginfo.filter.diff.setTo(b);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
	cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);

	if (constrast_pos > 0)
	{
		double delta = MAX_7B_F * constrast_pos / MAX_8B_F;
		a = MAX_8B_F / (MAX_8B_F - delta * 2);
		b = a * (brightness_pos - delta);
	}
	else
	{
		double delta = -MAX_7B_F  * constrast_pos / MAX_8B_F;
		a = (MAX_8B_F- delta * 2) / MAX_8B_F;
		b = a * brightness_pos + delta;
	}

	cv::multiply(imginfo.image.bgr_origins[BGRIndex::B], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);


	cv::multiply(imginfo.image.bgr_origins[BGRIndex::G], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);

	cv::multiply(imginfo.image.bgr_origins[BGRIndex::R], a - 1, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);

	imginfo.filter.diff.setTo(b);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
	cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);

	imginfo.trackbar.brightness = brightness_pos;
	imginfo.trackbar.constrast = constrast_pos;
	imginfo.changed_color_space = BGR_CHANGED;
}

void update_exposure(int pos)
{
	imginfo.filter.diff.setTo(abs(imginfo.trackbar.exposure));

	if (imginfo.trackbar.exposure >= 0)
	{
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	}
	else
	{
		cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
		cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
		cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	}

	imginfo.filter.diff.setTo(abs(pos));
	if (pos >= 0)
	{
		cv::add(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
		cv::add(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
		cv::add(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	}
	else
	{
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::B], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::B]);
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::G], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::G]);
		cv::subtract(imginfo.filter.bgr_filters[BGRIndex::R], imginfo.filter.diff, imginfo.filter.bgr_filters[BGRIndex::R]);
	}
	imginfo.trackbar.exposure = pos;
	imginfo.changed_color_space = BGR_CHANGED;
}

// float 처리를 해야 가능
void update_gamma(int pos)
{
	// double gammaValue=gamma/100.0;
	// double inv_gamma=1/gammaValue;

	cv::pow(imginfo.filter.diff, -imginfo.trackbar.gamma, imginfo.filter.diff);
	cv::multiply(255, imginfo.filter.diff, imginfo.filter.diff);
	cv::cvtColor(imginfo.filter.diff, imginfo.filter.diff, CV_8U);
	cv::subtract(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);

	imginfo.filter.diff = imginfo.filter.gamma_mask.clone();

	cv::pow(imginfo.filter.diff, pos, imginfo.filter.diff);
	cv::multiply(255, imginfo.filter.diff, imginfo.filter.diff);
	cv::cvtColor(imginfo.filter.diff, imginfo.filter.diff, CV_8U);
	cv::add(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);

	cv::cvtColor(imginfo.filter.diff, imginfo.filter.diff, CV_16S);

	imginfo.trackbar.gamma = pos;
	imginfo.changed_color_space = HSV_CHANGED;
}

void update_grain(int pos)
{
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_32F);
	imginfo.filter.diff = imginfo.filter.grain_mask.clone();

	cv::multiply(imginfo.filter.diff, (pos - imginfo.trackbar.grain)/5.0, imginfo.filter.diff);
	imginfo.filter.diff.convertTo(imginfo.filter.diff,CV_16S);
	cv::add(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);

	imginfo.trackbar.grain = pos;
	imginfo.changed_color_space = HSV_CHANGED;

}

void update_vignette(int pos) // 코드 옮기면서 변경함 -> IMG.depth 에서 에러 발생 가능
{
	imginfo.filter.diff = imginfo.filter.gaussian_kernel.clone();
	// imginfo.filter.hsv_filters[HSVIndex::V].convertTo(imginfo.filter.hsv_filters[HSVIndex::V],CV_16S);
	// cout<<imginfo.filter.diff<<endl;

	// 양이 밝게 , 음이 어둡게
	cv::multiply(imginfo.filter.diff,abs(imginfo.trackbar.vignette)*0.01,imginfo.filter.diff);
	if (imginfo.trackbar.vignette > 0)
	{
		cv::subtract(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);
	}
	else if (imginfo.trackbar.vignette < 0)
	{
		cv::add(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);
	}
	
	imginfo.filter.diff = imginfo.filter.gaussian_kernel.clone();
	cv::multiply(imginfo.filter.diff,abs(pos)*0.01,imginfo.filter.diff);
	if (pos > 0)
	{
		cv::add(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);
	}
	else if (pos < 0)
	{
		cv::subtract(imginfo.filter.hsv_filters[HSVIndex::V], imginfo.filter.diff, imginfo.filter.hsv_filters[HSVIndex::V]);
	}

	// imginfo.filter.hsv_filters[HSVIndex::V].convertTo(imginfo.filter.hsv_filters[HSVIndex::V],CV_16S);
	
	imginfo.trackbar.vignette = pos;
	imginfo.changed_color_space = HSV_CHANGED;
}