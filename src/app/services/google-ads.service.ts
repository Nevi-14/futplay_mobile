import { Injectable } from '@angular/core';
import { isPlatform, ModalController, Platform } from '@ionic/angular';

import {
  AdMob,
  AdMobRewardItem,
  AdOptions,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  RewardAdOptions,
  RewardAdPluginEvents,
  InterstitialAdPluginEvents 

} from '@capacitor-community/admob'
import { VideoScreenPage } from '../pages/video-screen/video-screen.page';
import { AlertasService } from './alertas.service';
@Injectable({
  providedIn: 'root'
})
export class GoogleAdsService {
ready: boolean = false;
  constructor(

    public modalCtrl: ModalController,
    public alertasService:AlertasService,
    public platform:Platform
  ) { }



  async initialize(){
    const {status} = await AdMob.trackingAuthorizationStatus();
    console.log('status',status);
    
    if(status ==='notDetermined'){
    
      console.log('Display Information before ads load first time')
    }
    AdMob.addListener
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
        npa: false
    
    await AdMob.showBanner(options);
        }
    
        async  hideBanner(){
    await AdMob.hideBanner();
    await AdMob.removeBanner();
        }
    
        async showInterstitial(){
          
        const options: AdOptions ={
          adId:'ca-app-pub-3191879076705982/3246336240',
          isTesting:false,
          npa: false
        };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
        this.modalCtrl.dismiss(null,null,'video-screen-modal');
        AdMob.addListener(InterstitialAdPluginEvents.Dismissed,  () => {

          this.ready = true;
         // this.modalCtrl.dismiss();
          this.modalCtrl.dismiss(null,null,'video-screen-modal');
          //this.alertasService.msessage('FUTPLAY', message)
        });
        }
    
        async showRewardVideo(){
          const options: RewardAdOptions ={
            adId:'ca-app-pub-3191879076705982/3638052631',
            isTesting:true,
            npa: false
                  //SSV: { ... }
          };
          await AdMob.prepareRewardVideoAd(options);
          await AdMob.showRewardVideoAd();
        }


}