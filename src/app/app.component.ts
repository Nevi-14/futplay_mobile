import { Component, OnInit } from '@angular/core';

import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { StatusBar} from '@capacitor/status-bar';
import {register} from 'swiper/element/bundle';
import { TranslateService } from '@ngx-translate/core';
import { UsuariosService } from './services/usuarios.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
;
  constructor( 
    public platform: Platform,
    public translateService: TranslateService,
    public usuariosService:UsuariosService
    
    
    ) {

      
    }


  

    ngOnInit(){
      this.translateService.setDefaultLang(this.usuariosService.file);
      (mapboxgl as any ).accessToken = environment.mapboxKey;
      if(!this.platform.is('mobileweb')) {
        StatusBar.setOverlaysWebView({overlay:false})
        StatusBar.setBackgroundColor({color:'#5a55ca'});
    
      }
    }

}