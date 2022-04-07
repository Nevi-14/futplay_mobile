import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estadistica-equipo',
  templateUrl: './estadistica-equipo.page.html',
  styleUrls: ['./estadistica-equipo.page.scss'],
})
export class EstadisticaEquipoPage implements OnInit {

  constructor(
    public modalCtrl:ModalController,
public equiposService: EquiposService

  ) { }

  ngOnInit() {

  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }
}
