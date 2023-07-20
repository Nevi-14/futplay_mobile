import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';

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
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number ;
  @Input() Cod_Distrito:number;
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService

  ) { }

  ngOnInit(

  ) {
    this.filtro.Cod_Provincia = this.Cod_Provincia;
   
  }
  
  limpiarDatos(){
    this.filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito:null,
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
      'Cod_Provincia': this.filtro.Cod_Provincia,
      'Cod_Canton':this.filtro.Cod_Canton,
      'Cod_Distrito':this.filtro.Cod_Distrito
    }));
  }


}
