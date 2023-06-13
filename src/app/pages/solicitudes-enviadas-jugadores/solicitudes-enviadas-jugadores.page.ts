import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-solicitudes-enviadas-jugadores',
  templateUrl: './solicitudes-enviadas-jugadores.page.html',
  styleUrls: ['./solicitudes-enviadas-jugadores.page.scss'],
})
export class SolicitudesEnviadasJugadoresPage implements OnInit {

  constructor(
    public solicitudesService:SolicitudesService,
    public equiposService:EquiposService
    
      ) { }
    
      ngOnInit() {
        
      }
    ionViewWillEnter(){
   
      this.solicitudesService.syncGetSolicitudesEnviadasEquipoToPromise(this.equiposService.equipo.equipo.Cod_Equipo).then(solicitudes =>{
    
        this.solicitudesService.solicitudesEquiposArray = solicitudes;
      })
    }

}
