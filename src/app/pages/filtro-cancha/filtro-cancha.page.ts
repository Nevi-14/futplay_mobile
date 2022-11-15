import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProvinciasService } from '../../services/provincias.service';
import { CantonesService } from '../../services/cantones.service';
import { DistritosService } from '../../services/distritos.service';


@Component({
  selector: 'app-filtro-cancha',
  templateUrl: './filtro-cancha.page.html',
  styleUrls: ['./filtro-cancha.page.scss'],
})
export class FiltroCanchaPage implements OnInit {
  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito: null,
    Cod_Categoria: null
  }
  constructor(
    public provinciasService:ProvinciasService,
    public cantonesService:CantonesService,
    public distritosService:DistritosService 

  ) { }

  ngOnInit() {



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
