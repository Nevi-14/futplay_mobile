import { Component, Input, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';

@Component({
  selector: 'app-filtro-ubicacion',
  templateUrl: './filtro-ubicacion.page.html',
  styleUrls: ['./filtro-ubicacion.page.scss'],
})
export class FiltroUbicacionPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
  }
  constructor(
    public provinciasService:ProvinciasService,
    public cantonesService:CantonesService,
    public distritosService:DistritosService,

  ) { }

  ngOnInit(

  ) {
  
  }
  onChangeProvincias($event){


  }

  onChangeCantones($event){


  }

  onChangeDistritos($event){


  }
  limpiarDatos(){

    
  }
  onOpenMenu(cancha){

  }
  submit(){
    
  }
}
