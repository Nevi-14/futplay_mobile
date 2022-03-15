import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { ListaEquiposService } from 'src/app/services/lista-equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.page.html',
  styleUrls: ['./lista-equipos.page.scss'],
})
export class ListaEquiposPage implements OnInit {

  @Input() club: any;
  textoBuscar = '';
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(
public listaEquiposService: ListaEquiposService,
public modalCtrl:ModalController,
public equiposService:EquiposService,
public usuariosService:UsuariosService
  ) { }

  ngOnInit() {

    this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario);
console.log(this.listaEquiposService.equipos, 'kdkd')

  }
  detalleEquipo(equipo){
    this.listaEquiposService.detalleEquipo(equipo)
  }
  onSearchChange(event){
    this.textoBuscar = event.detail.value;

  }

  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  retornarEquipo(equipo){

    this.modalCtrl.dismiss({

      equipo:  equipo
     });

  }

}
