package com.dreambuilder;

import android.app.Application;

import com.facebook.react.ReactApplication;
import net.no_mad.tts.TextToSpeechPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.imagepicker.ImagePickerPackage; 
import com.airbnb.android.react.maps.MapsPackage;
import com.wenkesj.voice.VoicePackage;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

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
            new TextToSpeechPackage(),
            new MapsPackage(),
          new PickerPackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new VoicePackage()
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
