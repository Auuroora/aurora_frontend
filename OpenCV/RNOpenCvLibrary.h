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

@interface RNOpenCvLibrary : NSObject <RCTBridgeModule>

@end