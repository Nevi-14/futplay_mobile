import { Component, OnInit, Input } from '@angular/core';
import { JugadoresEquipos } from '../../models/jugadoresEquipos';
import { HistorialPartidosEquipos } from '../../models/historialPartidosEquipos';
import { HistorialPartidoService } from 'src/app/services/historial-partido.service';
import { ModalController } from '@ionic/angular';
import { GoogleAdsService } from 'src/app/services/google-ads.service';

@Component({
  selector: 'app-evaluacion-equipo',
  templateUrl: './evaluacion-equipo.page.html',
  styleUrls: ['./evaluacion-equipo.page.scss'],
})
export class EvaluacionEquipoPage implements OnInit {
  @Input() equipo:JugadoresEquipos
evaluacionEquipo:HistorialPartidosEquipos = {
  Cod_Historial_Equipo:null,
  Cod_Equipo: 0,
  Dureza: '',
  Puntaje: 0

}

stadiumProfile =  'assets/main/team-profile.svg';
  constructor(
    public historialPartidosService:HistorialPartidoService,
    public modalCtrl:ModalController,
    public googleAdsService: GoogleAdsService
  ) { }

  ngOnInit() {
  }
  durezaEquipo(value){

   this.evaluacionEquipo.Cod_Equipo =  this.equipo.Cod_Equipo;
   this.evaluacionEquipo.Dureza = value.detail.value
console.log(this.evaluacionEquipo, 'evaluacion eqqq')

this.finalizar();
   
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }
  finalizar(){
this.modalCtrl.dismiss();
    this.historialPartidosService.evaluacionEquipo(this.evaluacionEquipo);
    this.googleAdsService.showRewardVideo();
    
  }
}
