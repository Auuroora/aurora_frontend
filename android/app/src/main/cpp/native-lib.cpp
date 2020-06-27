#include <jni.h>
#include <string>
#include <opencv2/core/core.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include "header.h"

using namespace cv;
using namespace std;

extern "C"
{
    WorkingImgInfo imginfo;
//**************************************** Test Function ******************************************
    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_ConvertRGBtoGray(JNIEnv *env, jobject thiz,
                                                         jlong mat_addr_input, jlong mat_addr_result)
    {
        Mat &matInput = *(Mat *)mat_addr_input;
        Mat &matResult = *(Mat *)mat_addr_result;

        cvtColor(matInput, matResult, COLOR_RGBA2GRAY);
    }

    JNIEXPORT jint JNICALL
    Java_com_aurora_1front_OpenCVModule_getImgRow(JNIEnv *env, jobject thiz)
    {
        return imginfo.row;
    }

    JNIEXPORT jint JNICALL
    Java_com_aurora_1front_OpenCVModule_getImgCol(JNIEnv *env, jobject thiz)
    {
        return imginfo.col;
    }

    JNIEXPORT jint JNICALL
    Java_com_aurora_1front_OpenCVModule_openCLTest(JNIEnv *env, jobject thiz)
    {
        if (!cv::ocl::haveOpenCL())
        {
            return 1;
        }

        // 컨텍스트 생성
        cv::ocl::Context context;
        if (!context.create(cv::ocl::Device::TYPE_GPU))
        {
            return 2;
        }
        cv::ocl::Device(context.device(0));
        cv::ocl::setUseOpenCL(true);

        return 3;
    }
//*******************************************************************************************
    void update_hue(int pos);
    void update_saturation(int pos);
    void update_lightness(int pos);
    void update_vibrance(int pos);
    void update_highlight_hue(int pos);
    void update_highlight_saturation(int pos);
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

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_initCV(JNIEnv *env, jobject thiz,
                                               jlong inputImg, jint colSize, jint rowSize)
    {
        Mat &src = *(Mat *)inputImg;
        imginfo.init_all(src, colSize, rowSize);
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_getWatermarkedImage(JNIEnv *env, jobject thiz,
                                               jlong inputImg, jlong inputLogo, jlong inputResImg, jint colSize, jint rowSize)
    {
        Mat &srcImg = *(Mat *)inputImg;
        Mat &srcLogo = *(Mat *)inputLogo;
        Mat &resImg = *(Mat *)inputResImg;

        resImg = get_watermarked_image(srcImg, srcLogo, colSize, rowSize);
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeHue(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_hue(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeSaturation(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_saturation(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeLightness(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_lightness(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeVibrance(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_vibrance(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeHighlightHue(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_highlight_hue(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeHighlightSaturation(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_highlight_saturation(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeShadowSaturation(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_shadow_saturation(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeShadowHue(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_shadow_hue(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeTemperature(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_temperature(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeBrightness(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_brightness(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeContrast(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_contrast(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeTint(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_tint(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeClarity(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_clarity(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeExposure(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_exposure(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeGamma(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_gamma(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeGrain(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_grain(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    JNIEXPORT void JNICALL
    Java_com_aurora_1front_OpenCVModule_onChangeVignette(JNIEnv *env, jobject thiz, jint cur_pos, jlong mat_addr_result)
    {
        Mat &matResult = *(Mat *)mat_addr_result;
        imginfo.update_vignette(cur_pos);
        imginfo.apply_filter();
        matResult = imginfo.get_res_img(); 
    }

    void WorkingImgInfo::apply_filter()
    {
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
        this->filter.diff.setTo((pos - this->trackbar.hue) / 10.0);
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
            cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::R]);
        else
            cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::B]);

        this->filter.diff.setTo(abs(pos));
        if (pos >= 0)
            cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::R]);
        else
            cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::B]);

        this->trackbar.temperature = pos;
    }

    void WorkingImgInfo::update_vibrance(int pos)
    {
        cv::Mat src = this->filter.hls_filters[HLSINDEX::S].clone();
        cv::addWeighted(
            src,
            1.0,
            this->weight.lightness,
            (double)(pos - this->trackbar.vibrance),
            1.0,
            this->filter.hls_filters[HLSINDEX::S]);
        this->trackbar.vibrance = pos;
    }

    void WorkingImgInfo::update_highlight_hue(int pos)
    {
        cv::Mat tmp = this->filter.hls_filters[HLSINDEX::H].clone();
        cv::addWeighted(
            (this->image.hls_origins[HLSINDEX::L]),
            (double)(pos - this->trackbar.highlight_hue) * 0.001,
            tmp,
            1,
            0,
            this->filter.hls_filters[HLSINDEX::H]);

        // 변경치 업데이트
        this->trackbar.highlight_hue = pos;
    }

    void WorkingImgInfo::update_highlight_saturation(int pos)
    {
        cv::Mat tmp = this->filter.hls_filters[HLSINDEX::S].clone();
        cv::addWeighted(
            (this->image.hls_origins[HLSINDEX::L]),
            double(pos - this->trackbar.highlight_sat) * 0.01,
            tmp,
            1,
            0,
            this->filter.hls_filters[HLSINDEX::S]);

        // 변경치 업데이트
        this->trackbar.highlight_sat = pos;
    }

    void WorkingImgInfo::update_shadow_hue(int pos)
    {
        cv::Mat tmp = this->filter.hls_filters[HLSINDEX::H].clone();
        cv::addWeighted(
            tmp,
            1.0,
            (1.0 / (this->image.hls_origins[HLSINDEX::L])),
            (pos - this->trackbar.shadow_hue),
            0,
            this->filter.hls_filters[HLSINDEX::H]);

        // 변경치 업데이트
        this->trackbar.shadow_hue = pos;
    }

    void WorkingImgInfo::update_shadow_saturation(int pos)
    {
        cv::Mat tmp = this->filter.hls_filters[HLSINDEX::S].clone();
        cv::addWeighted(
            tmp,
            1.,
            (30 / (this->image.hls_origins[HLSINDEX::L])),
            (pos - this->trackbar.shadow_sat),
            0,
            this->filter.hls_filters[HLSINDEX::S]);

        // 변경치 업데이트
        this->trackbar.shadow_sat = pos;
    }

/*********************************************************************
*	이하 동훈이 코드
*********************************************************************/
    void WorkingImgInfo::update_tint(int pos)
    {
        this->filter.diff.setTo((pos - this->trackbar.tint) / 5.0);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::G]);
        this->trackbar.tint = pos;
    }

    void WorkingImgInfo::update_clarity(int pos)
    {
        double clarity_value;
        clarity_value = this->trackbar.clarity / (double)20.0;

        cv::addWeighted(this->image.bgr, clarity_value, this->filter.clarity_filter, -clarity_value,
                        0, this->filter.clarity_mask_U);

        this->filter.clarity_mask_U.convertTo(this->filter.clarity_mask_S, CV_32FC3, 0.5);

        cv::split(this->filter.clarity_mask_S, this->filter.clarity_mask_split);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::B],
                     this->filter.clarity_mask_split[BGRINDEX::B],
                     this->filter.bgr_filters[BGRINDEX::B]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::G],
                     this->filter.clarity_mask_split[BGRINDEX::G],
                     this->filter.bgr_filters[BGRINDEX::G]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::R],
                     this->filter.clarity_mask_split[BGRINDEX::R],
                     this->filter.bgr_filters[BGRINDEX::R]);

        clarity_value = pos / (double)20.0;

        cv::addWeighted(this->image.bgr, clarity_value, this->filter.clarity_filter, -clarity_value,
                        0, this->filter.clarity_mask_U);
        this->filter.clarity_mask_U.convertTo(this->filter.clarity_mask_S, CV_32FC3, 0.5);
        cv::split(this->filter.clarity_mask_S, this->filter.clarity_mask_split);
        cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.clarity_mask_split[BGRINDEX::B],
                this->filter.bgr_filters[BGRINDEX::B]);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.clarity_mask_split[BGRINDEX::G],
                this->filter.bgr_filters[BGRINDEX::G]);
        cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.clarity_mask_split[BGRINDEX::R],
                this->filter.bgr_filters[BGRINDEX::R]);

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
        cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::B]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::G]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::R]);

        this->filter.diff.setTo(b);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::B]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::G]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::R]);

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
        cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::B]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::G]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
        cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::R]);

        this->filter.diff.setTo(b);
        cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::B]);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::G]);
        cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::R]);

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
        cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::B]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::G]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::R]);

        this->filter.diff.setTo(b);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::B]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::G]);
        cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                     this->filter.bgr_filters[BGRINDEX::R]);

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
        cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::B]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::G], a - 1, this->filter.diff);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::G]);

        cv::multiply(this->image.bgr_origins[BGRINDEX::R], a - 1, this->filter.diff);
        cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::R]);

        this->filter.diff.setTo(b);
        cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::B]);
        cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::G]);
        cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                this->filter.bgr_filters[BGRINDEX::R]);

        this->trackbar.contrast = contrast_pos;
    }

    void WorkingImgInfo::update_exposure(int pos)
    {
        this->filter.diff.setTo(abs(this->trackbar.exposure));

        if (this->trackbar.exposure >= 0)
        {
            cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::B]);
            cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::G]);
            cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::R]);
        }
        else
        {
            cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::B]);
            cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::G]);
            cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::R]);
        }

        this->filter.diff.setTo(abs(pos));
        if (pos >= 0)
        {
            cv::add(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::B]);
            cv::add(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::G]);
            cv::add(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                    this->filter.bgr_filters[BGRINDEX::R]);
        }
        else
        {
            cv::subtract(this->filter.bgr_filters[BGRINDEX::B], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::B]);
            cv::subtract(this->filter.bgr_filters[BGRINDEX::G], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::G]);
            cv::subtract(this->filter.bgr_filters[BGRINDEX::R], this->filter.diff,
                         this->filter.bgr_filters[BGRINDEX::R]);
        }
        this->trackbar.exposure = pos;
    }

    // float 처리를 해야 가능
    void WorkingImgInfo::update_gamma(int pos)
    {
        this->filter.diff = this->filter.gamma_mask.clone();

        cv::pow(this->filter.diff, -this->trackbar.gamma / 1000.0, this->filter.diff);
        cv::multiply(255, this->filter.diff, this->filter.diff);
        cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                     this->filter.hls_filters[HLSINDEX::L]);

        this->filter.diff = this->filter.gamma_mask.clone();

        cv::pow(this->filter.diff, -pos / 1000.0, this->filter.diff);
        cv::multiply(255, this->filter.diff, this->filter.diff);
        cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                this->filter.hls_filters[HLSINDEX::L]);

        this->trackbar.gamma = pos;
    }

    void WorkingImgInfo::update_grain(int pos)
    {
        this->filter.diff = this->filter.grain_mask.clone();

        cv::multiply(this->filter.diff, (pos - this->trackbar.grain) / 30.0, this->filter.diff);
        cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                this->filter.hls_filters[HLSINDEX::L]);

        this->trackbar.grain = pos;
    }

    void WorkingImgInfo::update_vignette(int pos)
    {
        this->filter.diff = this->filter.gaussian_kernel.clone();

        // 양이 밝게 , 음이 어둡게
        cv::multiply(this->filter.diff, abs(this->trackbar.vignette) * 0.01, this->filter.diff);
        if (this->trackbar.vignette > 0)
        {
            cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                         this->filter.hls_filters[HLSINDEX::L]);
        }
        else if (this->trackbar.vignette < 0)
        {
            cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                    this->filter.hls_filters[HLSINDEX::L]);
        }

        this->filter.diff = this->filter.gaussian_kernel.clone();
        cv::multiply(this->filter.diff, abs(pos) * 0.01, this->filter.diff);
        if (pos > 0)
        {
            cv::add(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                    this->filter.hls_filters[HLSINDEX::L]);
        }
        else if (pos < 0)
        {
            cv::subtract(this->filter.hls_filters[HLSINDEX::L], this->filter.diff,
                         this->filter.hls_filters[HLSINDEX::L]);
        }

        this->trackbar.vignette = pos;
    }
}
