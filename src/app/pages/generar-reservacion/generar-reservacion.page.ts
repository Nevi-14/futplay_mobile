import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ConfirmacionReservacionesService } from 'src/app/services/confirmacion-reservaciones.service';
import { ControlReservacionesService } from 'src/app/services/control-reservaciones.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IonicCalendar2Page } from '../ionic-calendar2/ionic-calendar2.page';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { SeleccionarFechaPage } from '../seleccionar-fecha/seleccionar-fecha.page';

@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
})
export class GenerarReservacionPage implements OnInit {
  @Input()rival : vistaEquipos;
  @Input()retador : vistaEquipos;
  @Input()cancha : ListaCanchas;
  selectedDate: Date = new Date();
  soccer= 'assets/icon/soccer.svg';
  fechaDateTime =  new Date().toISOString()
  private modalOpen:boolean = false;
    constructor(
      public modalCtrl: ModalController,
      public usuariosService: UsuariosService,
      public reservacionesService: ReservacionesService,
      public http: HttpClient,
      public  controlReservacionesService: ControlReservacionesService,
      public alertasService: AlertasService,
      public generrReservacionService: GenerarReservacionService,
      public confirmarReservacionesService:ConfirmacionReservacionesService
    ) { }
  retoRival : vistaEquipos;
    retoRetador : vistaEquipos;
  retoCancha : ListaCanchas;
  
    nuevaReservacion = {
      Cod_Cancha:  null,
      Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha:  null,
      Hora_Inicio: null,
      Hora_Fin:null,
      Cod_Estado: 2,
      DiaCompleto: false ,
      Descripcion: '',
      Luz:  false,
      Precio_Hora: 0 ,
      Precio_Luz: 0
     }
  nuevaReservacionTime = {
    time12_Hora_Inicio  : null,
    time12_Hora_Fin  : null
  }
  
    ngOnInit() {
      
     // this.generrReservacionService.generarReservacion(  this.cancha.Cod_Cancha,this.selectedDate);
  
  // ACTIVAR FILTRO PROVINCIA, CANTON DISTRITO CANCHAS -  JUGADORES
  // CARGAR MIS EQUIPOS
  // UNIRSE A UN EQUIPO, BUSCAR JUGADORES CON FILTRO Y EXPLUIR JUGADOR ACTUAL
  // ACEPTAR SOLICITUD  add - delete
  // INICIAR EVENTO CUANDO SE SELECCION LA FECHA DEL CALENDARIO
  // CARGAR HORARIO POR DIA DE CANCHA
  // CARGAR RESERVACIONES POR DIA 
  //ELIMINAR HORA INICIO Y HORA FIN Y UTILIZAR VISTA DIA CLICK EVENT
  // BLOQUEAR HORAS SEGUN HORA INICIO Y FIN EN EL CALENDARIO
  // EXCLUIR EQUIPOS DEL USUARIO CUANDO LLAMAMOS LOS EQUIPOS, SQL QUERY WHERE ID IS DIFFERENT Y HACER UN JOIN DE EQUIPOS DE LOS CUALES SOY PARTE COMO ADMIN
  
      console.log('rival',this.rival)
      console.log('retador',this.retador)
      console.log('cancha',this.cancha)
     this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
    }
    
    time(timeString){
      const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
      );
  
      return timeString12hr;
     }
  
  
    retornarFecha(event){
  this.fechaDateTime = event.detail.value
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, event.detail.value)
    this.modalCtrl.dismiss();
  
    }
  
    cerrarModal(){
      this.modalCtrl.dismiss();
      //this.modalCtrl.dismiss(undefined, undefined,'my-modal-id');
    }
    async agregarRival() {
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode:'ios',
        componentProps:{
          rival:true
        }
      });
  
       await modal.present();
       const { data } = await modal.onDidDismiss();
         console.log(data)
           if(data.equipo !== undefined){
           
            this.rival = data.equipo;
  
               this.modalCtrl.dismiss();
           }
    }
  
    async agregarRetador() {
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode:'ios',
        componentProps:{
          rival:false
        }
      });
  
  
       await modal.present();
       const { data } = await modal.onDidDismiss();
         console.log(data)
           if(data.equipo !== undefined){
           
            this.retador = data.equipo;
  
               this.modalCtrl.dismiss();
           }
    }
  
  
  
  
  
  
  async mostrarCalendario(){
  
    const modal = await this.modalCtrl.create({
      component:IonicCalendar2Page,
      cssClass:'my-custom-class',
      componentProps:{
        cancha: this.cancha
      }
    });
  
  await modal.present();
  
  const {  data } = await modal.onDidDismiss();
  
  if(data != undefined){

    console.log(data, 'dataaa')
    // new Date(yearValue, IndexOfMonth, dayValue, hours, minutes, seconds)
  this.nuevaReservacion.Hora_Inicio = data.fechaHora.Hora_Inicio ;
  this.nuevaReservacion.Hora_Fin = data.fechaHora.Hora_Fin;
  this.nuevaReservacion.Fecha = data.fechaHora.Fecha;
  this.selectedDate = data.fechaHora.Fecha;

  }
  
  }
  
  
    async agregarCancha() {
      const modal = await this.modalCtrl.create({
        component: ListaCanchasPage,
        cssClass: 'my-custom-modal',
        mode:'ios'
      });
  
  
       await modal.present();
       const { data } = await modal.onDidDismiss();
         console.log(data)
           if(data.cancha !== undefined){
           
            this.cancha = data.cancha;
            this.nuevaReservacion.Cod_Cancha = this.cancha.Cod_Cancha;
  
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, this.fechaDateTime)
  
               this.modalCtrl.dismiss();
           }
    }
  
  
    generarReto(){
  /**
   *     if(fRegistro.invalid) {return;}
   */
  
      this.nuevaReservacion.Fecha = this.nuevaReservacion.Fecha.toISOString();
      this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
    this.reservacionesService.insertarReservacion(this.nuevaReservacion).then((resp:any) =>{
  console.log(resp, 'resppppp')
      if(resp){
        let cofirmacion = {
   Cod_Reservacion: resp.Cod_Reservacion,
   Cod_Retador : this.retador.Cod_Equipo,
   Cod_Rival : this.rival.Cod_Equipo,
   Confirmacion_Retador: true,
   Confirmacion_Rival : false,
   Cod_Estado : 3,
        }
  
        this.confirmarReservacionesService.insertarReservacion(cofirmacion);
      }
    })
    
    
    this.cerrarModal();
    
    
    }
    async SelectDate(){
      if (!this.modalOpen){
        this.modalOpen = true;
        const modal = await this.modalCtrl.create({
          component:SeleccionarFechaPage,
          cssClass:'date-modal',
          componentProps:{
            title:'Fecha de nacimiento',
            id: 'seleccionar-fecha'
          },
          id: 'seleccionar-fecha'
        })
      
        await modal.present();
        const { data } = await modal.onWillDismiss();
     
        if(data !== undefined ){
          console.log(data,'data')
          
  this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, new Date(data.date).toISOString())
          this.selectedDate = data.date
         this.nuevaReservacion.Fecha = data.date
              this.modalOpen = false;
        }else{
     
               this.modalOpen = false;
        }
        
      }
    
      
    }
    
    generarReto2(fRegistro: NgForm){
      if(fRegistro.invalid) {return;}
  
      if(this.nuevaReservacion.Hora_Inicio == null || this.nuevaReservacion.Hora_Inicio == undefined || this.nuevaReservacion.Hora_Inicio == ''){
  
        return this.alertasService.message('FUTPLAY','Selecciona la hora de la reservación')
      } else if(this.cancha == null || this.cancha == undefined){
        return this.alertasService.message('FUTPLAY','Selecciona una cancha')
      }
      else if(this.rival == null || this.rival == undefined ){
        return this.alertasService.message('FUTPLAY','Selecciona un rival')
      }
      else if(this.retador == null || this.retador == undefined ){
        return this.alertasService.message('FUTPLAY','Selecciona un retador')
      }
      console.log(fRegistro.valid);
  
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Inicio
      this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
      this.nuevaReservacion.Fecha = this.fechaDateTime;
      this.nuevaReservacion.Descripcion  = '';
      this.nuevaReservacion.Hora_Inicio = this.nuevaReservacion.Hora_Inicio.hora_inicio;
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Fin.hora_fin;
      console.log(this.nuevaReservacion, this.rival, this.retador, this.fechaDateTime)
      this.controlReservacionesService.postReservacion(this.nuevaReservacion, this.cancha, this.rival, this.retador)
  
  this.cerrarModal();
  
    }
  

}
