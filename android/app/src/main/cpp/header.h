//
// Created by 김성수 on 2020/06/23.
//

#ifndef AURORA_FRONT_HEADER_H
#define AURORA_FRONT_HEADER_H

#endif //AURORA_FRONT_HEADER_H

#include <opencv2/opencv.hpp>
#include <opencv2/core/utility.hpp>
#include <opencv2/core/ocl.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>

#define BGRINDEX (int)BGR
#define HLSINDEX (int)HLS
#define DISTANCE 10
#define SIGMA_COLOR 50
#define SIGMA_SPACE 50
#define PI 3.141592
#define EXP 2.7//exp(1)
#define MAX_8B_F 255.0
#define MAX_8B_I 255
#define MAX_7B_F 128.0

// 색 공간 인덱스
enum class BGR {
    B,
    G,
    R
};

enum class HSV {
    H,
    S,
    V
};

enum class HLS {
    H,
    L,
    S
};

// Utils
void downsize_image(cv::Mat &src, cv::Mat &dst, int downsizedCol, int downsizedRow);

cv::Mat cut_image(cv::Mat src, int start_x, int start_y, int end_x, int end_y);

cv::Mat get_watermarked_image(cv::Mat src_img, cv::Mat src_logo, int width = 0, int height = 0);

cv::Mat get_preview_image(
        cv::Mat &src_img, cv::Mat src_logo,
        int hue = 0, int saturation = 0, int lightness = 0, int vibrance = 0,
        int highlight_hue = 0, int highlight_sat = 0, int shadow_hue = 0, int shadow_sat = 0,
        int temperature = 0, int tint = 0, int brightness = 0, int grain = 0,
        int clarity = 0, int exposure = 0, int gamma = 0, int vignette = 0, int contrast = 0,
        int width = 0, int height = 0 /* for downsizing */
);

// 작업중인 모든 변수 다 여기에
class WorkingImgInfo {
public:
    /*********************************************************************
    *	variable and struct
    *********************************************************************/
    int row; // 다운사이징 후 사진 가로
    int col; // 다운사이징 후 사진 세로

    std::vector<cv::Mat> test100;

    struct Image {
        cv::Mat downsized;            // 다운사이징 후 이미지
        cv::Mat bgr, hls, hsv, res; // bgr이미지, hsv이미지, 최종 결과물
        cv::Mat logo;
        std::vector<cv::Mat> bgr_origins; // split한 벡터(bgr)
        std::vector<cv::Mat> hls_origins; // split한 벡터(hls)
    } image;

    struct Filter {
        cv::Mat diff;        // 필터 연산을 위한 행렬
        cv::Mat bgr_filter; // bgr변경치가 기록되어 있는 필터
        cv::Mat hls_filter; // hls변경치가 기록되어 있는 필터

        cv::Mat clarity_filter;
        cv::Mat clarity_mask_U;
        cv::Mat clarity_mask_S;
        std::vector<cv::Mat> clarity_mask_split;

        cv::Mat gaussian_kernel;
        cv::Mat gamma_mask;
        cv::Mat grain_mask;
        cv::Mat salt_mask;
        cv::Mat pepper_mask;
        cv::Mat exposure_mask;

        std::vector<cv::Mat> bgr_filters; // split한 벡터(bgr)
        std::vector<cv::Mat> hls_filters; // split한 벡터(hls)
    } filter;

    // 색 검출용 가중치 행렬
    struct Weight {
        cv::Mat blue, green, red;
        cv::Mat hue, saturation, lightness;
    } weight;

    // trackbar pos
    // 현재 트랙바 상태 저장한 변수들
    struct Trackbar {
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

    void init_all(cv::Mat &img, int downsized_col, int downsized_row) {
        // this->originImg = cv::imread("./aurora_watermark.png", cv::IMREAD_COLOR);
        this->originImg = img.clone();
        this->init_image(downsized_col, downsized_row);
        this->init_filter();
        this->init_weight();
        this->init_trackbar(0);

        /* Memory Test */
    }

    /* image initialize */
    void init_image(int downsized_col, int downsized_row) {
        /* downsizing */
        downsize_image(this->originImg, this->image.downsized, downsized_col, downsized_row);
        this->row = this->image.downsized.rows;
        this->col = this->image.downsized.cols;

        /* convert */
        this->image.bgr = this->image.downsized.clone();
        this->image.res = this->image.bgr.clone();
        if (this->image.bgr.channels() == 4) {
            cv::cvtColor(this->image.bgr, this->image.bgr, cv::COLOR_BGRA2BGR);
        }
        cv::cvtColor(this->image.bgr, this->image.hls, cv::COLOR_BGR2HLS);

        // convert 32F
        this->image.bgr.convertTo(this->image.bgr, CV_32FC3);
        this->image.hls.convertTo(this->image.hls, CV_32FC3);
        this->image.hsv.convertTo(this->image.hsv, CV_32FC3);
        this->image.res.convertTo(this->image.res, CV_32FC3);
    }

    /* filter matrix initialize */
    void init_filter() {
        /* split(original) */
        cv::split(this->image.bgr, this->image.bgr_origins);
        cv::split(this->image.hls, this->image.hls_origins);

        /* delete 0 in hls,hsv image */
        cv::Mat mask;
        cv::inRange(this->image.hls_origins[HLSINDEX::L], 0, 0, mask);
        this->image.hls_origins[HLSINDEX::L].setTo(1, mask);
        cv::inRange(this->image.hls_origins[HLSINDEX::S], 0, 0, mask);
        this->image.hls_origins[HLSINDEX::S].setTo(1, mask);

        /* initialize filter matrix */
        this->filter.bgr_filter = cv::Mat::zeros(this->row, this->col, CV_32FC3);
        this->filter.hls_filter = cv::Mat::zeros(this->row, this->col, CV_32FC3);
        this->filter.diff = cv::Mat::zeros(this->row, this->col, CV_32F);

        cv::split(this->filter.bgr_filter, this->filter.bgr_filters);
        cv::split(this->filter.hls_filter, this->filter.hls_filters);
        /*****************************************************************************/
        // Gamma
        this->image.hls_origins[HLSINDEX::L].convertTo(this->filter.gamma_mask, CV_32F);
        cv::multiply(1.0 / 255.0, this->filter.gamma_mask, this->filter.gamma_mask);

        //Clarity
        cv::bilateralFilter(this->image.bgr, this->filter.clarity_filter, DISTANCE, SIGMA_COLOR,
                            SIGMA_SPACE);
        this->filter.clarity_mask_U = cv::Mat::zeros(this->row, this->col, CV_32FC3);
        this->filter.clarity_mask_S = cv::Mat::zeros(this->row, this->col, CV_32FC3);

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
        this->filter.gaussian_kernel = kernel_res.clone();

        kernel_x.deallocate();
        kernel_x_transpose.deallocate();
        kernel_y.deallocate();
        kernel_res.deallocate();

        //Grain
        this->filter.grain_mask = cv::Mat::zeros(this->row, this->col, CV_32F);
        cv::randu(this->filter.grain_mask, cv::Scalar(-20), cv::Scalar(20));

        //Exposure
        this->filter.exposure_mask = cv::Mat::ones(this->row, this->col, CV_32F);
    }

    /* make weight matrix */
    void init_weight() {
        this->weight.hue = cv::Mat::zeros(this->row, this->col, CV_32F);
        this->weight.saturation = cv::Mat::zeros(this->row, this->col, CV_32F);
        this->weight.lightness = cv::Mat::zeros(this->row, this->col, CV_32F);

        double w = 30;
        double mu = 130;
        double std = 10;
        cv::Mat src = this->image.hls_origins[HLSINDEX::L];
        cv::Mat dest = this->weight.lightness;

        for (int y = 0; y < src.rows; y++) {
            float *pointer_input = src.ptr<float>(y);
            float *pointer_output = dest.ptr<float>(y);
            for (int x = 0; x < src.cols; x++) {
                pointer_output[x] += (w * pow(EXP,
                                              -((pointer_input[x] - mu) * (pointer_input[x] - mu)) /
                                              (2.0 * std * std)) / sqrt(2.0 * PI * std * std));
            }
        }
        // TO DO
    }

    /* set trackbar pos */
    void init_trackbar(int pos) {
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

    cv::Mat get_origin_img() {
        return this->originImg;
    }

    cv::Mat get_res_img() {
        cv::Mat res;
        this->image.res.convertTo(res, CV_8UC3);
        return res;
    }

    void set_res_img(cv::Mat res) {
        this->image.res = res;
    }

    void set_logo_img(cv::Mat logo) {
        this->image.logo = logo;
    }

private:
    cv::Mat originImg; // 변경 불가한 원본 이미지(다운사이징 전)
};


void downsize_image(cv::Mat &src, cv::Mat &dst, int downsizedCol, int downsizedRow)
{
    if (src.rows > downsizedRow && src.cols > downsizedCol)
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
    cv::addWeighted(src_img, 1, res_logo, 0.7, 0, res_img);

    if (width && height)
        cv::resize(res_img, res_img, cv::Size(width, height), 0, 0, cv::INTER_AREA);

    return res_img;
}

// return img + logo + filter
cv::Mat get_preview_image(
        cv::Mat &src_img, cv::Mat src_logo,
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
    return get_watermarked_image(preview_info.image.res, src_logo, width, height);
}
/* global variable */
//extern WorkingImgInfo imginfo;
