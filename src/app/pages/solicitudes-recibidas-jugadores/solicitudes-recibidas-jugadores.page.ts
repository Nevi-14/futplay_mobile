import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitudes-recibidas-jugadores',
  templateUrl: './solicitudes-recibidas-jugadores.page.html',
  styleUrls: ['./solicitudes-recibidas-jugadores.page.scss'],
})
export class SolicitudesRecibidasJugadoresPage implements OnInit {

  constructor(
public solicitudesService:SolicitudesService,
public equiposService:EquiposService

  ) { }

  ngOnInit() {
    
  }
ionViewWillEnter(){

  this.solicitudesService.syncGetSolicitudesRecibidasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{

    this.solicitudesService.solicitudesEquiposArray = solicitudes;
  })
}
}
