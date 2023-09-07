import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { GeolocalizacionService } from 'src/app/services/geolocalizacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.page.html',
  styleUrls: ['./filtro-ubicacion.page.scss'],
})
export class FiltroUbicacionPage implements OnInit {
  filtro ={
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad:null
  }
  @Input() Codigo_Pais:number;
  @Input() Codigo_Estado:number ;
  @Input() Codigo_Ciudad:number;
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService,
    public geolocalizacionService:GeolocalizacionService
  ) { }

  ngOnInit(

  ) {
    this.filtro.Codigo_Pais = this.Codigo_Pais;
    this.geolocalizacionService.loadCountries(); 
  }
  
  limpiarDatos(){
    this.filtro ={
      Codigo_Pais: null,
      Codigo_Estado: null,
      Codigo_Ciudad:null
    }
    this.equiposService.syncListaEquiposToPromise( this.usuariosService.usuarioActual.Cod_Usuario
      ).then(equipos=>{
        this.equiposService.equipos = equipos;
  this.cerrarModal();
  
      })
  }
  onOpenMenu(cancha){

  }
 

  cerrarModal(){
    this.modalCtrl.dismiss(this.modalCtrl.dismiss({
      'Codigo_Pais': this.filtro.Codigo_Pais,
      'Codigo_Estado':this.filtro.Codigo_Estado,
      'Codigo_Ciudad':this.filtro.Codigo_Ciudad
    }));
  }

  consultarFiltro(form:NgForm){
    this.equiposService.syncfiltrarEquipos( this.filtro
      ).then(equipos=>{
        this.equiposService.equipos = equipos;
  })
}
}
