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

import { Router } from '@angular/router';
import { EquiposService } from 'src/app/services/equipos.service';
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
  constructor( private user: UsuariosService,private club:  EquiposService, private provincia: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService,private storage: Storage, private router: Router, public equiposService: EquiposService) {}

  ngOnInit(){

    this.equiposService.stadiumProfile =  'assets/main/team-profile.jpg';

  if(this.user.usuarioActual == null){
    this.router.navigate(['/inicio/inicio-sesion'])
  }
    (mapboxgl as any ).accessToken = environment.mapboxKey;

 //   console.log(this.user.user);
   this.checkDarkTheme()
    this.storage.create();
  }


  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark)
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }

}
