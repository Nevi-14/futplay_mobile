import { Injectable } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import {
  AdMob,
  AdMobRewardItem,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  RewardAdOptions,
  RewardAdPluginEvents,

} from '@capacitor-community/admob'
@Injectable({
  providedIn: 'root'
})
export class GoogleAdsService {

  constructor() { }



  async initialize(){
    const {status} = await AdMob.trackingAuthorizationStatus();
    console.log('status',status);
    
    if(status ==='notDetermined'){
    
      console.log('Display Information before ads load first time')
    }
    
    AdMob.initialize({
      requestTrackingAuthorization:true,
      testingDevices:['YOURTESTDEVICECODE'],
      initializeForTesting:true,
    })
        }
    
      async showBanner(){
    const adId = isPlatform('ios') ? 'ios-ad-id':'android-ad-unit';
        const options: BannerAdOptions ={
          adId,
          adSize:BannerAdSize.ADAPTIVE_BANNER,
          position:BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting:true,
        };
    
        // the default behavuior of the google mbile ads SDK is to serve personalized ads.
        // set this to true to request Non-Persobalized Ads
        //npa: true
    
    await AdMob.showBanner(options);
        }
    
        async  hideBanner(){
    await AdMob.hideBanner();
    await AdMob.removeBanner();
        }
    
        async showInterstitial(){
          
        const options: AdOptions ={
          adId:'ca-app-pub-9127656840662825/4587273159',
          isTesting:true,
             //npa: true
        };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
        }
    
        async showRewardVideo(){
          const options: RewardAdOptions ={
            adId:'ca-app-pub-9127656840662825/4587273159',
            isTesting:true,
               //npa: true
                  //SSV: { ... }
          };
          await AdMob.prepareRewardVideoAd(options);
          await AdMob.showRewardVideoAd();
        }



}
