import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { AlertasService } from 'src/app/services/alertas.service';
import { EquiposGeolocalizacionService } from 'src/app/services/equipos-geolocalizacion.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';

@Component({
  selector: 'app-equipo-geolocalizacion',
  templateUrl: './equipo-geolocalizacion.page.html',
  styleUrls: ['./equipo-geolocalizacion.page.scss'],
})
export class EquipoGeolocalizacionPage implements OnInit {
  noValue = 'Seleccionar';
  @Input() equipoGeolocalizacion: EquipoGeolocalizacion;

  constructor(
    public geolocalizacionService: GeolocalizacionService,
    public modalCtrl: ModalController,
    public cd: ChangeDetectorRef,
    public equiposGeolocalizacionService: EquiposGeolocalizacionService,
    private translateService: TranslateService,
    public alertasService: AlertasService
  ) {}

  ngOnInit() {
    this.geolocalizacionService.paises = [];
    this.geolocalizacionService.estados = [];
    this.geolocalizacionService.ciudades = [];
    console.log(this.equipoGeolocalizacion, 'equipoGeolocalizacion');
    this.geolocalizacionService.Codigo_Pais = this.equipoGeolocalizacion.Codigo_Pais;
    this.geolocalizacionService.Codigo_Estado = this.equipoGeolocalizacion.Codigo_Estado;
    this.geolocalizacionService.Codigo_Ciudad = this.equipoGeolocalizacion.Codigo_Ciudad;
    this.geolocalizacionService.loadCountries();
    this.geolocalizacionService.loadStates();
    this.cd.detectChanges();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  actualizarGeolocalizacion(form: NgForm) {
    this.alertasService.presentaLoading(this.translateService.instant('UPDATING_DATA'));
    let data = form.value;
    if (data.Codigo_Pais != null) {
      this.equipoGeolocalizacion.Codigo_Pais = data.Codigo_Pais;
    }

    if (data.Codigo_Estado != null) {
      this.equipoGeolocalizacion.Codigo_Estado = data.Codigo_Estado;
      console.log(this.geolocalizacionService.estados, 'estados');
    }
    if (data.Codigo_Ciudad != null) {
      this.equipoGeolocalizacion.Codigo_Ciudad = data.Codigo_Ciudad;
      console.log(this.geolocalizacionService.ciudades, 'cities');
    }

    this.equipoGeolocalizacion.Codigo_Postal = data.Codigo_Postal;
    this.equipoGeolocalizacion.Direccion = data.Direccion;

    this.equiposGeolocalizacionService.syncPutEquipoGeolocalizacionToPromise(this.equipoGeolocalizacion).then(
      res => {
        console.log(res);
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', this.translateService.instant('DATA_UPDATED_SUCCESSFULLY'));
        this.regresar();
      },
      err => {
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTLAY', this.translateService.instant('SOMETHING_WENT_WRONG'));
      }
    );
  }
}