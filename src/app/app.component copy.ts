import { Component, OnInit } from '@angular/core';

import { PosicionesService } from './services/posiciones.service';
;
import { ProvinciasService } from './services/provincias.service';
import { CantonesService } from './services/cantones.service';
import { DistritosService } from './services/distritos.service';
import { UsuariosService } from './services/usuarios.service';
import * as  mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';

import { StatusBar} from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

import { EquiposService } from 'src/app/services/equipos.service';
import { StorageService } from './services/storage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  stadiumProfile = 'assets/main/stadium-profile.jpg';
  currentYear: number=new Date().getFullYear();
  year =  new Date().getFullYear();
  month = new Date().getMonth()+1;
  constructor( 
    private user: UsuariosService,private club:  EquiposService, private provincia: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService,private storage: Storage, private router: Router, public equiposService: EquiposService,
   private storageService: StorageService,public platform: Platform

    
    
    
    ) {

      
    }


  

  ngOnInit(){
    (mapboxgl as any ).accessToken = environment.mapboxKey;
    if(!this.platform.is('mobileweb')) {
      StatusBar.setOverlaysWebView({overlay:false})
      StatusBar.setBackgroundColor({color:'#5a55ca'});
  
    }
    this.checkDarkTheme()
    this.equiposService.stadiumProfile =  'assets/main/team-profile.jpg';

    this.storageService.get('user').then( resp =>{
      console.log('user', resp)
      if(resp !=null || resp !=undefined){
        this.user.usuarioActual = resp;
        this.router.navigate(['/futplay/mi-perfil']);

      
        
      }else{
        this.router.navigate(['/inicio/inicio-sesion'])
      }
    });
 

 
  }


  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark)
    
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }

}
