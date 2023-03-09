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
import { CalendarioCanchaPage } from '../calendario-cancha/calendario-cancha.page';
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
  myDate:any;
  lockSwipes = false;
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
   fecha = new Date().toISOString();
   diaActual: HorarioCanchas;
   horario:any = null;
   habilitarHoras = false;
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
  



 limpiarDatos(){
 


 }

  ionViewWillEnter(){
this.limpiarDatos();
 
    if(this.cancha){
 
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
      this.horarioCanchasService.horarioCancha = [];
    }

    
 

   }

   reservacionIndividual($event){
    let value = $event.detail.checked;
    console.log(value);
    this.rival = null;
    this.detalleReservacion.Reservacion_Grupal = value;

   }







   async agregarRival() {
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
     
         if(data !== undefined){
       
          this.rival = data.equipo;
          console.log('this.rival', this.rival)
             //this.modalCtrl.dismiss();

             if(this.cancha != null && this.cancha != undefined){
              this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
   
              //this.horarioCancha();
            }
            this.cd.detectChanges();
            
         }

  }

  click(date){
  	console.log('click..',date);
  	let hoursMinutes = date.split(':');
  	let time = this.formatAMPM(hoursMinutes);
  	console.log('time',time);
}

formatAMPM(date) {
	  var hours = date[0];
	  var minutes = date[1];
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12;
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
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
       if(data !== undefined){
         
          this.retador = data.equipo;
console.log('this.retador', this.retador)
            // this.modalCtrl.dismiss();

             if(this.cancha != null && this.cancha != undefined){
              this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
             
             // this.horarioCancha();
            }
            this.cd.detectChanges();
             
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
 
     if(data !== undefined){
     
      this.cancha = data.cancha;
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
//      this.horarioCancha();
this.consultarHoras();
this.cd.detectChanges();
     //    this.modalCtrl.dismiss();
     }

     
}


cerrarModal(){
  this.modalCtrl.dismiss();
}

async calendarioCancha() {
  this.equiposService.equipos = [];
  const modal = await this.modalCtrl.create({
    component: CalendarioCanchaPage,
    cssClass: 'my-custom-modal',
    mode:'ios',
    componentProps:{
      cancha:this.cancha
    }
  });

   await modal.present();
      const { data } = await modal.onDidDismiss();
   
       if(data !== undefined){
     
    
          
       }

}
horaInicio($event){
  const value:objetoFecha = $event.detail.value;
if(value){
 
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
console.log( value)
  this.gestionReservacionesService.calHoraFin(this.cancha.cancha.Cod_Cancha,value);
}

}

horaFin($event){
  const value:objetoFecha = $event.detail.value;
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;



  console.log('this.detalle', this.detalleReservacion)
  if(this.nuevaReservacion.Hora_Inicio && this.nuevaReservacion.Hora_Fin){

    console.log('this.nuevaReservacion', this.nuevaReservacion)
     
   this.gestionReservacionesService.syncGetDisponibilidadReservaciones(
      this.nuevaReservacion.Cod_Cancha,
      format( this.nuevaReservacion.Hora_Inicio,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0] ,
      format( this.nuevaReservacion.Hora_Fin,'yyy-MM-dd')+" "+this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0],
    ).then(reservaciones =>{
  
      console.log('reservacionessss' , reservaciones)

  if(reservaciones.length > 0){
    this.Hora_Inicio = null;
    this.Hora_Fin = null;
    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.cd.markForCheck();
      this.cd.detectChanges();
    this.alertasService.message('FUTPLAY','Lo sentimimos, no se pueden reservar a la hora solicitada, intenta  con un hora distinta.');

    return
  }

  this.detalleReservacion.Total_Horas = this.nuevaReservacion.Hora_Fin.getHours() - this.nuevaReservacion.Hora_Inicio.getHours();
  this.actualizarDetalle()


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
  this.alertasService.loadingDissmiss();

  this.content.scrollToBottom(1500);
  }
consultarHoras(){

  this.limpiarDatos();
 
this.horarioCanchasService.syncGetHorarioCanchaToPromise(this.cancha.cancha.Cod_Cancha).then(resp =>{

  let  horario:HorarioCanchas[] = resp;
  this.gestionReservacionesService.horario = horario;
  let {continuar, diaActual} =  this.gestionReservacionesService.consultarHoras(horario,new Date(format(new Date(this.fecha), 'yyy/MM/dd')))
  this.diaActual = diaActual;
  this.horario = this.hora(this.diaActual.Hora_Inicio, this.diaActual.Hora_Fin)
  if(continuar){
    this.gestionReservacionesService.calHoraInicio(this.cancha.cancha.Cod_Cancha,new Date(format(new Date(this.fecha), 'yyy/MM/dd')));
  }
 
this.habilitarHoras = continuar
this.cd.detectChanges()

     
})



  
}
cambiarFecha($event){
  console.log($event);
  this.consultarHoras();
}

hora(inicio,fin){

  return this.canchasService.retornaHoraAmPm(inicio)  + ' - ' +this.canchasService.retornaHoraAmPm(fin);
 }

 enviarReto(){
  console.log('this.nuevaReservacion',this.nuevaReservacion);
  console.log('this.detalleReservacion',this.detalleReservacion)
 }
}
