import { Component, OnInit } from '@angular/core';
import { PosicionesService } from '../../services/posiciones.service';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';

@Component({
  selector: 'app-filtro-jugador',
  templateUrl: './filtro-jugador.page.html',
  styleUrls: ['./filtro-jugador.page.scss'],
})
export class FiltroJugadorPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Posicion: null,
    Estatura: 0,
    Peso: 0
  }
  constructor(
public posicionesService:PosicionesService,
public provinciasService:ProvinciasService,
public cantonesService:CantonesService,
public distritosService:DistritosService,
  ) { }

  
  ngOnInit() {

 
  }
  onChange($event, test1,test2,test4){


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
  cerrarModal(){

    
  }

  submit(){

    
  }
}
