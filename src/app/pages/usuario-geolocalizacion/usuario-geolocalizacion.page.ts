import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioGeolocalizacion } from 'src/app/models/usuarioGeolocalizacion';
import { AlertasService } from 'src/app/services/alertas.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { UsuariosGeolocalizacionService } from 'src/app/services/usuarios-geolocalizacion.service';

@Component({
  selector: 'app-usuario-geolocalizacion',
  templateUrl: './usuario-geolocalizacion.page.html',
  styleUrls: ['./usuario-geolocalizacion.page.scss'],
})
export class UsuarioGeolocalizacionPage implements OnInit {
@Input() usuarioGeolocalizacion:UsuarioGeolocalizacion
  constructor(
 public modalCtrl:ModalController,
 public geolocalizacionService:GeolocalizacionService,
 public usuariosGeolocacionService:UsuariosGeolocalizacionService ,
 public alertasService:AlertasService ,
 private translateService: TranslateService 
  ) { }

  ngOnInit() {
    this.geolocalizacionService.paises = [];
    this.geolocalizacionService.estados = [];
    this.geolocalizacionService.ciudades = [];
    this.geolocalizacionService.Codigo_Pais = this.usuarioGeolocalizacion.Codigo_Pais;
    this.geolocalizacionService.Codigo_Estado = this.usuarioGeolocalizacion.Codigo_Estado;
    this.geolocalizacionService.Codigo_Ciudad = this.usuarioGeolocalizacion.Codigo_Ciudad;
    this.geolocalizacionService.loadCountries();
    this.geolocalizacionService.loadStates();
    this.geolocalizacionService.loadCities();
  }

  regresar(){

this.modalCtrl.dismiss();
  }


actualizar(form:NgForm){
  this.alertasService.presentaLoading(this.translateService.instant('UPDATING'));
  this.usuariosGeolocacionService.syncPutUsuarioGeolocalizacionToPromise(this.usuarioGeolocalizacion).then(()=>{
 this.alertasService.loadingDissmiss();
    this.modalCtrl.dismiss();
  }, error =>{ 
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', this.translateService.instant('SOMETHING_WENT_WRONG'))
   })
}
}
