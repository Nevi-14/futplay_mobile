import { Component, OnInit } from '@angular/core';
import { CanchasService } from '../../services/canchas.service';
import { ModalController } from '@ionic/angular';
import { AlertasService } from '../../services/alertas.service';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';

@Component({
  selector: 'app-lista-canchas',
  templateUrl: './lista-canchas.page.html',
  styleUrls: ['./lista-canchas.page.scss'],
})
export class ListaCanchasPage implements OnInit {
  semana:any[] = [
    { Code: 0, Day: 'Domingo' },
    { Code: 1, Day: 'Lunes' },
    { Code: 2, Day: 'Martes' },
    { Code: 3, Day: 'Miercoles' },
    { Code: 4, Day: 'Jueves' },
    { Code: 5, Day: 'Viernes' },
    { Code: 6, Day: 'Sabado' }]
    dia = null;
    filtro ={
      Cod_Provincia: null,
      Cod_Canton: null,
      Cod_Distrito: null,
      Cod_Categoria: null
    }
    textoBuscar = '';
  constructor(
public canchasService : CanchasService,
public modalCtrl: ModalController,
public alertasService: AlertasService

  ) { }

  ngOnInit() {
    this.alertasService.presentaLoading('Cargando datos..')
    this.canchasService.syncListaCanchasToPromise().then(resp =>{
      this.canchasService.canchas = resp;
  this.alertasService.loadingDissmiss();
    }, error =>{
  
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal')
    })

  }

  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
      regresar(){
this.modalCtrl.dismiss();
  }

  async filtroUbicacion(){

  
     
    const modal  = await this.modalCtrl.create({
     component: FiltroCanchaPage,
     cssClass: 'my-custom-class',
     breakpoints: [0, 0.3, 0.5, 0.8],
     initialBreakpoint: 0.5,
     id:'my-modal-id',
     componentProps:{
      'Cod_Provincia':this.filtro.Cod_Provincia, 
      'Cod_Canton':this.filtro.Cod_Canton, 
      'Cod_Distrito':this.filtro.Cod_Distrito , 
      'Cod_Categoria':this.filtro.Cod_Categoria 
     }
   });
   await modal .present();

   const { data } = await modal.onWillDismiss();
 console.log(data, 'filto return')
   if(data !== undefined ){
    this.filtro.Cod_Provincia = data.Cod_Provincia;
    this.filtro.Cod_Canton = data.Cod_Canton;
    this.filtro.Cod_Distrito = data.Cod_Distrito;
    this.filtro.Cod_Categoria = data.Cod_Categoria;
  

   }
 

 }
  retornarCancha(cancha){

    this.modalCtrl.dismiss({

      cancha:  cancha
     });

  }
 
}
