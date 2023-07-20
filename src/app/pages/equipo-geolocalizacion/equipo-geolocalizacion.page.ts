import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';

@Component({
  selector: 'app-equipo-geolocalizacion',
  templateUrl: './equipo-geolocalizacion.page.html',
  styleUrls: ['./equipo-geolocalizacion.page.scss'],
})
export class EquipoGeolocalizacionPage implements OnInit {
@Input() equipoGeolocalizacion:EquipoGeolocalizacion
  constructor(
    public geolocalizacionService:GeolocalizacionService,
    public modalCtrl:ModalController  
  ) { }

  ngOnInit() {
    this.geolocalizacionService.loadCountries();
    this.geolocalizacionService.Country_Code = this.equipoGeolocalizacion.Codigo_Pais;
    this.geolocalizacionService.loadStates();
  }

  regresar(){
    this.modalCtrl.dismiss();
  }
}
