import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioGeolocalizacion } from 'src/app/models/usuarioGeolocalizacion';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';

@Component({
  selector: 'app-usuario-geolocalizacion',
  templateUrl: './usuario-geolocalizacion.page.html',
  styleUrls: ['./usuario-geolocalizacion.page.scss'],
})
export class UsuarioGeolocalizacionPage implements OnInit {
@Input() usuarioGeolocalizacion:UsuarioGeolocalizacion
  constructor(
 public modalCtrl:ModalController,
 public geolocalizacionService:GeolocalizacionService   
  ) { }

  ngOnInit() {
    this.geolocalizacionService.loadCountries();
    this.geolocalizacionService.Country_Code = this.usuarioGeolocalizacion.Codigo_Pais;
    this.geolocalizacionService.loadStates();
  }

  regresar(){

this.modalCtrl.dismiss();
  }

}
