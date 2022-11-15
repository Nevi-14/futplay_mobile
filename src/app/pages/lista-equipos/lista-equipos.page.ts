import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EquiposService } from '../../services/equipos.service';
import { FiltroUbicacionPage } from '../filtro-ubicacion/filtro-ubicacion.page';

@Component({
  selector: 'app-lista-equipos',
  templateUrl: './lista-equipos.page.html',
  styleUrls: ['./lista-equipos.page.scss'],
})
export class ListaEquiposPage implements OnInit {

  @Input() club: PerfilEquipos;
  @Input() rival: boolean;

  textoBuscar = '';
  @ViewChild(IonContent, { static: false }) content: IonContent;
  constructor(
public modalCtrl:ModalController,
public equiposService:EquiposService,
public usuariosService:UsuariosService,
public alertasService: AlertasService,
private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    if(this.rival){
      this.equiposService.equipos = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.syncListaEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{
        this.equiposService.equipos = resp.slice(0);
        this.alertasService.loadingDissmiss();
        this.cd.markForCheck();
        this.cd.detectChanges();
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando datos...')
      });
      console.log('equipos')

    }else{
      this.equiposService.equipos = [];
      this.alertasService.presentaLoading('Cargando datos...');
      this.equiposService.syncMisEquiposToPromise(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(resp =>{
        this.equiposService.equipos = resp.slice(0);
        this.alertasService.loadingDissmiss();
        this.cd.markForCheck();
        this.cd.detectChanges();  this.cd.markForCheck();
  this.cd.detectChanges();
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Error cargando datos...')
      });
      console.log('mis equipos')

    }
 
 
console.log(this.equiposService.equipos, 'kdkd')

  }
  detalleEquipo(equipo){
    //this.equiposService.detalleEquipo(equipo)
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
  retornarEquipo(equipo:PerfilEquipos){

    this.modalCtrl.dismiss({

      equipo:  equipo
     });

  }
  filledStars(stars:number){

    return new Array(stars)
  }
  emptyStars(stars:number){
    let value = 5 - stars;
    return new Array(value)
  }
}