import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CanchasService } from 'src/app/services/canchas.service';
import { CantonesService } from 'src/app/services/cantones.service';
import { DistritosService } from 'src/app/services/distritos.service';
import { ListaCanchasService } from 'src/app/services/lista-canchas.service';
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
    Precio: 0
  }
  constructor(
    public provinciasService: ProvinciasService,
    public cantonesService: CantonesService,
    public distritosService: DistritosService,
    public modalCtrl: ModalController,
    public listaCanchasService: ListaCanchasService,
    public canchasService: CanchasService

  ) { }

  ngOnInit() {

    this.provinciasService.syncProvincias();

  }

  submit(){
    this.cerrarModal();
    this.canchasService.syncfiltrarCanchas(
      
      this.filtro.Cod_Provincia,
      this.filtro.Cod_Canton,
      this.filtro.Cod_Distrito,
      this.filtro.Precio
    )
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
