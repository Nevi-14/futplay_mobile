import { Component, OnInit } from '@angular/core';

import { PosicionesService } from './services/posiciones.service';
import { SolicitudesService } from './services/solicitudes.service';
import { ProvinciasService } from './services/provincias.service';
import { CantonesService } from './services/cantones.service';
import { DistritosService } from './services/distritos.service';
import { UsuariosService } from './services/usuarios.service';
import { EquiposService } from './services/equipos.service';
import { JugadoresEquiposService } from './services/jugadoresEquipos.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentYear: number=new Date().getFullYear();
  year =  new Date().getFullYear();
  month = new Date().getMonth()+1;
  constructor( private user: UsuariosService,private club:  EquiposService, private posicion: PosicionesService, private solicitudes: SolicitudesService, private jugadores: JugadoresEquiposService, private provincia: ProvinciasService, private cantones: CantonesService, private distritos: DistritosService) {}

  ngOnInit(){
 
    this.club.getClubs();
    this.club.getClubs();
this.posicion.getPosiciones();
    this.provincia.getProvincias();
    this.cantones.getCantones();
    this.distritos.getDistritos();
    this.user.getUsers();
    this.jugadores.getJugadores();
    this.solicitudes.getSolicitudes();
    console.log(this.user.user);
   this.checkDarkTheme()
  }


  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(prefersDark)
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }

}
