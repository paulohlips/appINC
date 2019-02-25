package com.appinc;

import android.app.Application;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import org.reactnative.camera.RNCameraPackage;
import com.terrylinla.rnsketchcanvas.SketchCanvasPackage;

import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.spyworldxp.barcodescanner.BarcodeScannerPackage;


import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImageResizerPackage(),
            new RNSpinkitPackage(),
            new RNImgToBase64Package(),
            new RNCameraPackage(),
            new SketchCanvasPackage(),           
            new PickerPackage(),          
            new LottiePackage(),
            new ReactNativeAudioPackage(),
            new RNSoundPackage(),
            new VectorIconsPackage(),
            new BarcodeScannerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
