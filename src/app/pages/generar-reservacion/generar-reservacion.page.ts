import { Component, ViewChild, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IonContent, IonDatetime, ModalController, PopoverController, } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { PerfilCancha } from '../../models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { CalendarComponent } from 'ionic2-calendar';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { CanchasService } from '../../services/canchas.service';
import { EmailService } from 'src/app/services/email.service';
import { EquiposService } from '../../services/equipos.service';
import { format } from 'date-fns';
 

interface objetoFecha{
  id:number,
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
  time12: number,
  meridiem: string,
  date: Date
}

@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class GenerarReservacionPage  {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  @ViewChild(CalendarComponent) myCal: CalendarComponent
  @Input() cancha:PerfilCancha;
  @Input() diaCompleto 
  @Input()rival : PerfilEquipos;
  @Input()retador : PerfilEquipos;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  reservacionGrupal:boolean=true;
  nuevaReservacion = {
    Cod_Cancha:  null,
    Cod_Usuario:  this.usuariosService.usuarioActual.usuario.Cod_Usuario,
    Reservacion_Externa: false,
    Titulo: '',
    Cod_Estado: 2,
    Fecha:  new Date().toISOString(),
    Hora_Inicio: null,
    Hora_Fin: null,
    Estado:  true,
    Dia_Completo:  false
   }
   detalleReservacion:DetalleReservaciones = {
    Reservacion_Grupal: true,
    Cod_Detalle:null,
    Cod_Reservacion:  null,
    Cod_Estado:  3,
    Cod_Retador: null,
    Cod_Rival: null,
    Confirmacion_Rival:null,
    Luz:  null,
    Monto_Luz: 0,
    Total_Horas: 0,
    Precio_Hora:  0,
    Cod_Descuento:  null,
    Porcentaje_Descuento:  0,
    Monto_Descuento:  0,
    Porcentaje_Impuesto:  0,
    Monto_Impuesto:  0,
    Porcentaje_FP:  10,
    Monto_FP:  0,
    Monto_Equipo:  0,
    Monto_Sub_Total:  0,
    Monto_Total:  0,
    Pendiente:  0,
    Notas_Estado:  'Confirmacion Pendiente'
   }
   Hora_Inicio: any;
   Hora_Fin: any;
   diaActual: HorarioCanchas;
   horario:any = null;
   habilitarHoras = false;
   isModalOpen:boolean = false;
   fecha = new Date().toISOString();
  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public popOverCtrl:PopoverController,
    public horarioCanchasService: HorarioCanchasService,
    private cd: ChangeDetectorRef,
    public gestionReservacionesService: ReservacionesService,
    public alertasService: AlertasService,
    public canchasService: CanchasService,
    public emailService:EmailService,
    public equiposService: EquiposService
  ) { }
  

  resetearHoras(){
    this.Hora_Inicio = null;
    this.Hora_Fin = null;
    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.gestionReservacionesService.horaInicioArray = [];
    this.gestionReservacionesService.horaFinArray = [];
  }

  formatoAmPM (date:Date) {
    // hour: 'numeric', minute: 'numeric', hour12: true
    return date.toLocaleString('en-US', { hour: '2-digit',minute: '2-digit', hour12: true })
  }

  ionViewWillEnter(){
    console.log('rival', this.rival)
    if(this.cancha){
      this.resetearHoras();
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
      this.horarioCanchasService.horarioCancha = [];
      this.consultarHoras();
    }
  
   }

   reservacionIndividual($event){
let value = $event.detail.checked;
this.resetearHoras();
this.detalleReservacion.Reservacion_Grupal = value;
if(!this.reservacionGrupal){
  this.rival = null
}
this.cd.detectChanges();
    if(this.cancha){
      this.consultarHoras();
    }
   }



   async agregarRival() {
    if(!this.isModalOpen){
      this.isModalOpen = true;
      this.equiposService.equipos = [];
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
          this.isModalOpen = false;
       
           if(data !== undefined){  
            this.rival = data.equipo;
            this.cd.detectChanges();
               if(this.cancha != null && this.cancha != undefined){
                this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
                if(this.cancha && this.retador && !this.reservacionGrupal || this.cancha && this.rival && this.retador && this.reservacionGrupal){
                  setTimeout(()=>{
                    this.content.scrollToBottom(1000);
                   }, 1000)}
              }
            
              
           }
    }
 

  }



  async agregarRetador() {
 
    if(!this.isModalOpen){
      this.isModalOpen = true;
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
     this.isModalOpen = false;
       if(data !== undefined){   
          this.retador = data.equipo;
             if(this.cancha != null && this.cancha != undefined){
              this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
            }
            this.cd.detectChanges();
            if(this.cancha && this.retador && !this.reservacionGrupal || this.cancha && this.rival && this.retador && this.reservacionGrupal){
              setTimeout(()=>{
                this.content.scrollToBottom(1000);
               }, 1000)}                   
         }
        }
  }



async agregarCancha() {
  if(!this.isModalOpen){
    this.isModalOpen = true;
const modal = await this.modalCtrl.create({
  component: ListaCanchasPage,
  cssClass: 'my-custom-modal',
  mode:'ios'
});

 await modal.present();
 const { data } = await modal.onDidDismiss();
 this.isModalOpen = false;
     if(data !== undefined){ 
      this.cancha = data.cancha;
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
      this.consultarHoras();
      this.cd.detectChanges();
     if(this.cancha && this.retador && !this.reservacionGrupal || this.cancha && this.rival && this.retador && this.reservacionGrupal){
      setTimeout(()=>{
        this.content.scrollToBottom(1000);
       }, 1000)}
     }
    }

     
}

cerrarModal(){
  this.modalCtrl.dismiss();
}

horaInicio($event){
const value:objetoFecha = $event.detail.value;
if(value){
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
  this.gestionReservacionesService.calHoraFin(this.cancha.cancha.Cod_Cancha,value);
  setTimeout(()=>{
    this.content.scrollToBottom(1000);
   }, 1000)}
}

horaFin($event){
  const value:objetoFecha = $event.detail.value;
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;
  if(this.nuevaReservacion.Hora_Inicio && this.nuevaReservacion.Hora_Fin){
   this.gestionReservacionesService.syncGetDisponibilidadReservaciones(
      this.nuevaReservacion.Cod_Cancha,
      format( this.nuevaReservacion.Hora_Inicio,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0] ,
      format( this.nuevaReservacion.Hora_Fin,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0],
    ).then(reservaciones =>{

  if(reservaciones.length > 0){
    this.resetearHoras();   
    this.cd.markForCheck();
    this.cd.detectChanges();
    this.alertasService.message('FUTPLAY','Lo sentimimos, no se pueden reservar a la hora solicitada, intenta  con un hora distinta.');
    return
  }
  this.detalleReservacion.Total_Horas = this.nuevaReservacion.Hora_Fin.getHours() - this.nuevaReservacion.Hora_Inicio.getHours();
  this.actualizarDetalle();
    })


  }

}
actualizarDetalle(){
    this.alertasService.presentaLoading('Actualizando Factura')
    this.detalleReservacion.Monto_Sub_Total = this.detalleReservacion.Total_Horas * this.cancha.cancha.Precio_Hora;
    this.detalleReservacion.Monto_Total = this.detalleReservacion.Monto_Sub_Total
    // Discount = bill * discount / 100
    this.detalleReservacion.Monto_Descuento = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_Descuento / 100 
    this.detalleReservacion.Monto_Impuesto = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_Impuesto  / 100 
    this.detalleReservacion.Monto_FP = this.detalleReservacion.Monto_Sub_Total * this.detalleReservacion.Porcentaje_FP  / 100 
    this.detalleReservacion.Precio_Hora = this.cancha.cancha.Precio_Hora;
    this.detalleReservacion.Cod_Retador =  this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Cod_Rival = this.rival ? this.rival.equipo.Cod_Equipo  : this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Monto_Equipo =  this.detalleReservacion.Monto_Total / 2
  if(this.cancha && this.retador && !this.reservacionGrupal || this.cancha && this.rival && this.retador && this.reservacionGrupal){
    this.alertasService.loadingDissmiss();
    this.content.scrollToBottom(1500);
}
  }
consultarHoras(){
this.horarioCanchasService.syncGetHorarioCanchaToPromise(this.cancha.cancha.Cod_Cancha).then(resp =>{
  let  horario:HorarioCanchas[] = resp;
  this.gestionReservacionesService.horario = horario;
  let {continuar, diaActual} =  this.gestionReservacionesService.consultarHoras(horario,new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd')))
  this.diaActual = diaActual;
  if(continuar){
    this.gestionReservacionesService.calHoraInicio(this.cancha.cancha.Cod_Cancha,new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd')));
  }
this.habilitarHoras = continuar
this.cd.detectChanges();

     
})  
}


cambiarFecha($event){
  let inputDate = $event.detail.value;
  var today = new Date();
  var newDate = new Date(inputDate);
  newDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
 if (newDate.getTime() < today.getTime()) {
this.habilitarHoras = false;
  this.alertasService.message('FUTPLAY','Lo sentimimos, intenta con una fecha distinta!.');
  return;
}
this.resetearHoras();
this.nuevaReservacion.Fecha = newDate.toISOString();
this.habilitarHoras = true;
this.consultarHoras();
this.cd.detectChanges()
}


 enviarReto(){
  this.alertasService.presentaLoading('Guardando reto...')
  this.nuevaReservacion.Titulo = this.detalleReservacion.Reservacion_Grupal ? this.retador.equipo.Nombre +' VS '+this.rival.equipo.Nombre : 'Reservación Individual cancha ' + this.cancha.nombre;
  this.nuevaReservacion.Fecha = new Date(format( new Date(this.nuevaReservacion.Fecha),'yyy-MM-dd')).toISOString().split('T')[0]
  this.nuevaReservacion.Hora_Inicio = format( this.nuevaReservacion.Hora_Inicio,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0] 
  this.nuevaReservacion.Hora_Fin =  format( this.nuevaReservacion.Hora_Fin,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0] 

  if(! this.detalleReservacion.Reservacion_Grupal) {
    this.nuevaReservacion.Cod_Estado = 4;
    this.detalleReservacion.Cod_Estado = 4;
    this.detalleReservacion.Cod_Rival = this.retador.equipo.Cod_Equipo;
    this.detalleReservacion.Confirmacion_Rival = true;
      }

  console.log('this.nuevaReservacion',this.nuevaReservacion);
  console.log('this.detalleReservacion',this.detalleReservacion)
this.gestionReservacionesService.insertarReservacionToPromise(this.nuevaReservacion).then((resp:any) =>{
console.log(' this.nuevaReservacion resp', resp)
this.detalleReservacion.Cod_Reservacion = resp.reservacion.Cod_Reservacion;
//this.actualizarDetalle()
this.gestionReservacionesService.insertarDetalleReservacionToPromise(this.detalleReservacion).then(resp =>{
if(this.detalleReservacion.Reservacion_Grupal){
  this.emailService.enviarCorreoReservaciones(1, this.rival.correo, this.nuevaReservacion.Fecha, this.nuevaReservacion.Hora_Inicio, this.cancha.nombre, this.rival.nombre, this.retador.nombre).then(resp =>{
    this.cerrarModal();
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ');
  }, error =>{
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
  })
}else{
  let body = {
    body: {
    email:  null,
    body: "Se ha confirmado un reto para el día " +  this.nuevaReservacion.Fecha +" en  la cancha " +  this.cancha.nombre + " Hora : " +this.formatoAmPM(this.nuevaReservacion.Hora_Inicio) + ". Reservación Individual "+this.usuariosService.usuarioActual.nombre+ ".",
    footer: "¡Hay un reto esperándote!"
}

  }

  body.body.email = this.usuariosService.usuarioActual.usuario.Correo;
this.emailService.syncPostReservacionEmail(body).then(resp =>{
  body.body.email = this.cancha.correo;
  this.emailService.syncPostReservacionEmail(body).then(resp =>{
    this.cerrarModal();
    this.alertasService.loadingDissmiss();
    this.alertasService.message('FUTPLAY', 'El reto  se efectuo con éxito ')
  
  })


 

})

   


}



      
      }, error =>{
        this.alertasService.loadingDissmiss();
        this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
      })
      
      return
      this.cerrarModal();
    }, error =>{
      this.alertasService.loadingDissmiss();
      this.alertasService.message('FUTPLAY', 'Lo sentimos algo salio mal ')
    })
    
 }





}
