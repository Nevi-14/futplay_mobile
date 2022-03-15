import { Component, OnInit, Input } from '@angular/core';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { ListaCanchas } from '../../models/listaCanchas';
import { ModalController } from '@ionic/angular';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { HttpClient } from '@angular/common/http';
import { ControlReservacionesService } from '../../services/control-reservaciones.service';
import { NgForm } from '@angular/forms';
import { AlertasService } from 'src/app/services/alertas.service';
import { MyReservationsPage } from '../my-reservations/my-reservations.page';


@Component({
  selector: 'app-equipo-reservacion',
  templateUrl: './equipo-reservacion.page.html',
  styleUrls: ['./equipo-reservacion.page.scss'],
})
export class EquipoReservacionPage implements OnInit {
@Input()rival : vistaEquipos;
@Input()retador : vistaEquipos;
@Input()cancha : ListaCanchas;

soccer= 'assets/icon/soccer.svg';
fechaDateTime =  new Date().toISOString()

  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public reservacionesService: ReservacionesService,
    public http: HttpClient,
    public  controlReservacionesService: ControlReservacionesService,
    public alertasService: AlertasService,
  ) { }


  nuevaReservacion = {
    Cod_Cancha:  null,
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: false,
    Titulo: '',
    Fecha:  null,
    Hora_Inicio: null,
    Hora_Fin:null,
    Estado:  true,
    diaCompleto: false ,
    Descripcion: null,
    Luz:  false,
    Precio_Hora: 0 ,
    Precio_Luz: 0
   }

  ngOnInit() {


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
  }
  


  retornarFecha(event){
this.fechaDateTime = event.detail.value
this.controlReservacionesService.syncReservacionesFecha(this.cancha.Cod_Cancha, event.detail.value)
  this.modalCtrl.dismiss();

  }
      

  cerrarModal(){
    this.modalCtrl.dismiss(undefined, undefined,'my-modal-id');
  }
  async agregarRival() {
    const modal = await this.modalCtrl.create({
      component: ListaEquiposPage,
      cssClass: 'my-custom-modal',
      mode:'ios'
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
      mode:'ios'
    });


     await modal.present();
     const { data } = await modal.onDidDismiss();
       console.log(data)
         if(data.equipo !== undefined){
         
          this.retador = data.equipo;

             this.modalCtrl.dismiss();
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



  generarReto(fRegistro: NgForm){
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
