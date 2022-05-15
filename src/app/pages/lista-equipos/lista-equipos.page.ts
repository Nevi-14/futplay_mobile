import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { AlertasService } from 'src/app/services/alertas.service';
import { ListaEquiposService } from 'src/app/services/lista-equipos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.page.html',
  styleUrls: ['./lista-equipos.page.scss'],
})
export class ListaEquiposPage implements OnInit {

  @Input() club: any;
  @Input() rival: boolean;

  textoBuscar = '';
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(
public listaEquiposService: ListaEquiposService,
public modalCtrl:ModalController,
public equiposService:EquiposService,
public usuariosService:UsuariosService,
public alertasService: AlertasService
  ) { }

  ngOnInit() {

    if(this.rival){
      this.equiposService.equipos = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.SyncEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.equiposService.equipos = resp.slice(0);
        this.alertasService.loadingDissmiss();

      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando datos...')
      });
      console.log('equipos')

    }else{
      this.equiposService.misEquipos = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.SyncMisEquipos(this.usuariosService.usuarioActual.Cod_Usuario).then(resp =>{
        this.equiposService.misEquipos = resp.slice(0);
        this.alertasService.loadingDissmiss();

      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando datos...')
      });
      console.log('mis equipos')

    }
 
 
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

  async filtroUbicacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroUbicacionPage,
     cssClass: 'my-custom-class',
     id:'my-modal-id'
   });
   await modal .present();
 }
  retornarEquipo(equipo){

    this.modalCtrl.dismiss({

      equipo:  equipo
     });

  }

}
