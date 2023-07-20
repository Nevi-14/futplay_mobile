import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EquiposService } from '../../services/equipos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.page.html',
  styleUrls: ['./filtro-usuarios.page.scss'],
})
export class FiltroUsuariosPage implements OnInit {

  filtro ={
    Cod_Provincia: null,
    Cod_Canton: null,
    Cod_Distrito:null,
    Cod_Posicion:null,
  }
  @Input() Cod_Provincia:number;
  @Input() Cod_Canton:number ;
  @Input() Cod_Distrito:number;
  @Input() Cod_Posicion:number;
  constructor(
    public modalCtrl: ModalController,
    public equiposService: EquiposService,
    public usuariosService:UsuariosService

  ) { }

  ngOnInit(

  ) {
   
  }
 

  limpiarDatos(){
    this.filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito:null,
      Cod_Posicion:null,
    }
    this.usuariosService.syncListaUsuariosToPromise(this.usuariosService.usuarioActual.Cod_Usuario).then(usuarios=>{

      this.usuariosService.usuarios = usuarios;
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
