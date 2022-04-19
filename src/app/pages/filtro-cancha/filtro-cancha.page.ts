import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ProvinciasService } from 'src/app/services/provincias.service';

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
    Cod_Posicion: null,
    Precio: 0
  }
  constructor(
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCtrl: ModalController

  ) { }

  ngOnInit() {

    this.provinciasService.syncProvincias();

  }
    onChange($event , provincia, canton, distrito){
    if(provincia){
  
   this.cantonesService.syncCantones($event.target.value);
    }else if(canton){
  
      this.distritosService.syncDistritos(this.filtro.Cod_Provincia, $event.target.value);
  
    }else{
      
    }
    console.log($event.target.value);
    }

    cerrarModal(){
      this.modalCtrl.dismiss();
    }
}
