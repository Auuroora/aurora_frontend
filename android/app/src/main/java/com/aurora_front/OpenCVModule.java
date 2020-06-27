package com.aurora_front;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.telecom.Call;
import android.util.Base64;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.android.Utils;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Scalar;
import org.opencv.core.Core;
import org.opencv.core.Scalar;
import org.opencv.imgproc.Imgproc;

import java.io.ByteArrayOutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
/********************************* How to Use for Android Bridge Function ******************************************

    @ReactMethod
    public [return type] [FunctionName]([**** argv ******], [Callback callBack]) {  <- ONE CALLBACK
        try {
            // Create Bitmap Image
            Bitmap bitmapImage = Bitmap.createBitmap(getImgCol(), getImgRow(), Bitmap.Config.ARGB_8888);
            Mat res = new Mat();

            // CV Function
            onChangeTemperature(val, res.getNativeObjAddr());

            //  Mat to Base64String
            Utils.matToBitmap(res, bitmapImage);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
            String resString = Base64.encodeToString(byteArrayOutputStream.toByteArray(), 0);

            // callBack Base64 resString
            callBack.invoke(resString);
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

********************************************************************************************************************/
public class OpenCVModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    //********************  Native Function ****************************************
    public native int getImgRow();
    public native int getImgCol();
    public native int openCLTest();
    public native void initCV(long inputImg, int colSize, int rowSize);
    public native void getWatermarkedImage(long inputImg, long inputLogo, long resImg, int colSize, int rowSize);

    public native void onChangeHue(int pos, long inputImg);
    public native void onChangeSaturation(int pos, long inputImg);
    public native void onChangeLightness(int pos, long inputImg);
    public native void onChangeVibrance(int pos, long inputImg);
    public native void onChangeHighlightHue(int pos, long inputImg);
    public native void onChangeHighlightSaturation(int pos, long inputImg);
    public native void onChangeShadowHue(int pos, long inputImg);
    public native void onChangeShadowSaturation(int pos, long inputImg);
    public native void onChangeTemperature(int pos, long inputImg);
    public native void onChangeBrightness(int pos, long inputImg);
    public native void onChangeContrast(int pos, long inputImg);
    public native void onChangeTint(int pos, long inputImg);
    public native void onChangeClarity(int pos, long inputImg);
    public native void onChangeExposure(int pos, long inputImg);
    public native void onChangeGamma(int pos, long inputImg);
    public native void onChangeGrain(int pos, long inputImg);
    public native void onChangeVignette(int pos, long inputImg);
    //******************************************************************************

    static {
        System.loadLibrary("native-lib");
    }

    public OpenCVModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "OpenCVModule";
    }

    @ReactMethod
    public void CVopenCLTest(int a, Callback callBack){
        try {
            callBack.invoke(openCLTest());
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    String matToString(Mat res){
        Bitmap bitmapImage = Bitmap.createBitmap(getImgCol(), getImgRow(), Bitmap.Config.ARGB_8888);
        Utils.matToBitmap(res, bitmapImage);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        return Base64.encodeToString(byteArrayOutputStream.toByteArray(), 0);
    }

    Mat base64StringToMat(String base64Str){
        byte[] decodedString = Base64.decode(base64Str, Base64.DEFAULT);
        Bitmap bitmapImage = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

        Mat src = new Mat();
        Utils.bitmapToMat(bitmapImage, src);
        return src;
    }

    @ReactMethod
    public void initCV(String imageAsBase64, int colSize, int rowSize, Callback callBack){
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inDither = true;
            options.inPreferredConfig = Bitmap.Config.ARGB_8888;
            byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
            Bitmap bitmapImage = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

            Mat src = new Mat();
            Utils.bitmapToMat(bitmapImage, src);

            initCV(src.getNativeObjAddr() , colSize, rowSize);

            callBack.invoke(getImgRow() + " x " + getImgCol());
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void getWatermarkedImg(String imageAsBase64, String logoAsBase64, int colSize, int rowSize, Callback callBack){
        try {
            Mat srcImg = base64StringToMat(imageAsBase64);
            Mat srcLogo = base64StringToMat(logoAsBase64);
            Mat resImg = new Mat();

            getWatermarkedImage(srcImg.getNativeObjAddr(), srcLogo.getNativeObjAddr(), resImg.getNativeObjAddr(), colSize, rowSize);

            callBack.invoke(matToString(resImg));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateHue(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeHue(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateSaturation(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeSaturation(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateLightness(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeLightness(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateVibrance(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeVibrance(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateHighlightHue(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeHighlightHue(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateHighlightSaturation(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeHighlightSaturation(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateShadowHue(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeShadowHue(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateShadowSaturation(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeShadowSaturation(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateTemperature(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeTemperature(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateBrightness(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeBrightness(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateContrast(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeContrast(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateTint(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeTint(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateClarity(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeClarity(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateExposure(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeExposure(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateGamma(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeGamma(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateGrain(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeGrain(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void CVupdateVignette(int val, Callback callBack) {
        try {
            Mat res = new Mat();
            onChangeVignette(val, res.getNativeObjAddr());
            callBack.invoke(matToString(res));
        } catch (Exception e) {
            callBack.invoke(e.getMessage());
        }
    }
}
