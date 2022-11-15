import { Component, OnInit } from '@angular/core';

import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { StatusBar} from '@capacitor/status-bar';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
;
  constructor( 
    public platform: Platform
    
    
    ) {

      
    }


  

    ngOnInit(){
      (mapboxgl as any ).accessToken = environment.mapboxKey;
      if(!this.platform.is('mobileweb')) {
        StatusBar.setOverlaysWebView({overlay:false})
        StatusBar.setBackgroundColor({color:'#5a55ca'});
    
      }
    }

}