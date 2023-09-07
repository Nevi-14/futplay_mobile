import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EquipoGeolocalizacion } from 'src/app/models/equipoGeolocalizacion';
import { EquiposGeolocalizacionService } from 'src/app/services/equipos-geolocalizacion.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';

@Component({
  selector: 'app-equipo-geolocalizacion',
  templateUrl: './equipo-geolocalizacion.page.html',
  styleUrls: ['./equipo-geolocalizacion.page.scss'],
})
export class EquipoGeolocalizacionPage implements OnInit {
  noValue = 'Seleccionar';
@Input() equipoGeolocalizacion:EquipoGeolocalizacion
  constructor(
    public geolocalizacionService:GeolocalizacionService,
    public modalCtrl:ModalController ,
    public cd:ChangeDetectorRef,
    
  public equiposGeolocalizacionService:EquiposGeolocalizacionService
  ) { }

  ngOnInit() {
    console.log(this.equipoGeolocalizacion,'equipoGeolocalizacion')
    this.geolocalizacionService.loadCountries();
    this.geolocalizacionService.Codigo_Pais = this.equipoGeolocalizacion.Codigo_Pais;
    this.geolocalizacionService.Codigo_Estado = this.equipoGeolocalizacion.Codigo_Estado;
    this.geolocalizacionService.Codigo_Ciudad = this.equipoGeolocalizacion.Codigo_Ciudad;
   
    this.geolocalizacionService.loadStates();
    this.cd.detectChanges();
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  actualizarGeolocalizacion(form:NgForm){
    let data  = form.value;
if(data.Codigo_Pais != null){
  this.equipoGeolocalizacion.Codigo_Pais = data.Codigo_Pais;
}


if(data.Codigo_Estado != null){
  this.equipoGeolocalizacion.Codigo_Estado = data.Codigo_Estado;
  console.log(this.geolocalizacionService.estados ,'estados')
}
if(data.Codigo_Ciudad != null){
  this.equipoGeolocalizacion.Codigo_Ciudad = data.Codigo_Ciudad;
  console.log(this.geolocalizacionService.ciudades ,'cities')
}


this.equipoGeolocalizacion.Codigo_Postal = data.Codigo_Postal;
this.equipoGeolocalizacion.Direccion = data.Direccion;

console.log(form.value),'form';


console.log(this.equipoGeolocalizacion),'this.equipoGeolocalizacion';
 

    this.equiposGeolocalizacionService.syncPutEquipoGeolocalizacionToPromise(this.equipoGeolocalizacion).then(
      res=>{
        console.log(res);
        this.regresar();
      },
      err=>console.log(err)
    );
  }
}
