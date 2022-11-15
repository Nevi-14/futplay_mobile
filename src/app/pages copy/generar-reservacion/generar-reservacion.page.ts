import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { AlertasService } from 'src/app/services/alertas.service';

import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { CalendarComponent } from 'ionic2-calendar';
import { ConfiguracionHorarioService } from 'src/app/services/configuracion-horario.service';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';
import { EmailService } from 'src/app/services/email.service';
import { FacturacionService } from '../../services/facturacion.service';
import { FacturaDetaleReservaciones } from 'src/app/models/facturaDetalleReservaciones';
import { HorarioCachaPage } from '../horario-cacha/horario-cacha.page';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';

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
  date: string
}
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
})
export class GenerarReservacionPage implements OnInit,AfterViewInit {

  //
  show  = false;;
  viewTitle: string
  calendarMode: any = 'month'
  calendar = {
    mode: this.calendarMode,
    currentDate: new Date()
  }

  lockSwipes = false;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @Input()rival : vistaEquipos;
  @Input()retador : vistaEquipos;
  @Input()cancha : ListaCanchas;
  horario:HorarioCanchas = null;
  soccer= 'assets/icon/soccer.svg';

  Hora_Inicio: any;
  Hora_Fin: any;
  add = true;
  factura:FacturaDetaleReservaciones = {
     ID : null,
     Cod_Reservacion  : null,
     Cod_Pago_Retador : "",
     Cod_Descuento : 'FREE',
     Cod_Pago_Rival :  "",
     Impuesto  :  0,
     Porcentaje_FP : 10,
     Monto_FP :0,
     Monto_Impuesto   :  0,
     Descuento  : 100,
     Monto_Descuento  : 0,
     Total_Horas:0,
     Precio_Hora   :  0,
     Luz: null,
     Precio_Luz   :  0,
     Monto_Subtotal  : 0,
     Monto_Total  : 0,
     Monto_Equipo  : 0,
     Monto_Abonado_Retador   :  0,
     Monto_Abonado_Rival    :  0,
     Monto_Pendiente_Retador   : 0,
     Monto_Pendiente_Rival   : 0,
     Estado   : true,
     Notas_Estado    :  ""
  }

    constructor(
      public modalCtrl: ModalController,
      public usuariosService: UsuariosService,
      public reservacionesService: ReservacionesService,
      public http: HttpClient,
      public alertasService: AlertasService,
      private cd: ChangeDetectorRef,
      public horarioCanchasService: HorarioCanchasService,
      public popOverCtrl:PopoverController,
      public configuracionHorarioService: ConfiguracionHorarioService,
      public gestionReservacionesService: GestionReservacionesService,
      public alertCtrl: AlertController,
      public emailService: EmailService,
      public faturacionService:FacturacionService
    ) { }
  retoRival : vistaEquipos;
  retoRetador : vistaEquipos;
  retoCancha : ListaCanchas;
  
    nuevaReservacion = {
      Cod_Cancha:  null,
      Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
      Reservacion_Externa: false,
      Titulo: '',
      Fecha:  new Date(),
      Hora_Inicio: null,
      Hora_Fin:null,
      Cod_Estado: 2,
      DiaCompleto: false ,
      Descripcion: '',
      Luz:  false,
      Precio_Hora: 0 ,
      Precio_Luz: 0
     }

  
  
  retornaHoraAmPm(hours){


    let minutes = null;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let hourValue = hours +':'+'00'+':'+'00'+' ' + ampm;
    
    
    return hourValue;
    
    }




    ngOnInit() {

      this.nuevaReservacion.Fecha = new Date();



if(this.cancha != null && this.cancha != undefined){
  this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
  this.horarioCancha();
}
 
  
    }
    ngAfterViewInit() {
      var me = this;
      setTimeout(function() {
          me.lockSwipes = true;
      },100);
  }
horarioCancha(){
  this.horarioCanchasService.syncHorarioCanchasPromise(this.cancha.Cod_Cancha).then((resp:any) =>{
    this.configuracionHorarioService.horarioCancha = resp;
    this.gestionReservacionesService.horario = resp;

  
    })
}
  
diaActual(){

  this.horario = this.gestionReservacionesService.horario[this.nuevaReservacion.Fecha.getDay()];


console.log('horario',this.horario)
}

  

// FUNCIONES GENERALES
  
  
 horaInicio($event){
  const value= $event.detail.value;
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
  this.cd.markForCheck();
  this.cd.detectChanges();

  let dateToUse: Date = null;
  let start: number = null;

  if(new Date().getDate() === new Date().getDate()){
    
    dateToUse = new Date();
    start = dateToUse.getHours();
  }else{
  
    dateToUse = this.nuevaReservacion.Fecha;
    start = this.Hora_Inicio.hours+1;
  
  }
  this.gestionReservacionesService.syncreservacionesFiltrarFecha(this.cancha.Cod_Cancha ,this.gestionReservacionesService.formatoFecha(this.nuevaReservacion.Fecha,'-')).then(resp =>{


    this.gestionReservacionesService.cancularHora( this.nuevaReservacion.Fecha, this.Hora_Inicio.hours+1).then(horas =>{
      this.gestionReservacionesService.horaFinArray = horas;
      if(horas == undefined ){

        return;
      
      }
     
      for( let j = 0; j < resp.length; j++){
    
        let index  = this.gestionReservacionesService.horaFinArray.findIndex (h => h.hours ==  new Date(resp[j]['Hora_Fin']).getHours());
      
        if(index >=0){
          this.gestionReservacionesService.horaFinArray.splice(index,1);
      
        }
      
         }

    })
      });
;
}

async schedule(){

  
 const modal  = await this.modalCtrl.create({
   component: HorarioCachaPage,
  cssClass: 'my-custom-class'
});
await modal .present();
}

horaFin($event){
  const value:objetoFecha = $event.detail.value;
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;
  this.cd.markForCheck();
  this.cd.detectChanges();

  if(this.Hora_Inicio && this.horaFin){
    let fecha = this.nuevaReservacion.Fecha.toISOString().split('T')[0];
    fecha = fecha+"T00:00:00"
    console.log(fecha,'fecha')
    this.gestionReservacionesService.syncGetDisponibilidadCancha(
      this.nuevaReservacion.Cod_Cancha,
      fecha,
      this.nuevaReservacion.Hora_Inicio,
      this.nuevaReservacion.Hora_Fin,
      
    ).then(reservaciones =>{
  
  if(reservaciones.length > 0){
  
    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.Hora_Inicio = null;
    this.Hora_Fin = null;
    this.horarioCancha();
    this.alertasService.message('FUTPLAY','Lo sentimimos, no se pueden reservar a la hora solicitada, intenta  con un hora distinta.');

    return
  }
    })

  }


}
  

    generarReto(){

 this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
console.log('reto', this.nuevaReservacion)


    this.reservacionesService.insertarReservacion(this.nuevaReservacion).then((resp:any) =>{

      if(resp){
        let cofirmacion = {

   Cod_Reservacion: resp.Cod_Reservacion,
   Cod_Retador : this.retador.Cod_Equipo,
   Cod_Rival : this.rival.Cod_Equipo,
   Confirmacion_Retador: true,
   Confirmacion_Rival : false,
   Cod_Estado : 3,


        }

        this.factura.Cod_Reservacion = resp.Cod_Reservacion;
        this.factura.Precio_Hora = this.cancha.Precio_Hora;
        this.factura.Luz = this.nuevaReservacion.Luz;
        if(this.factura.Luz){
          this.factura.Precio_Luz = this.cancha.Precio_Luz;
        }
       
        this.factura.Total_Horas = new Date(resp.Hora_Fin).getHours() - new Date(resp.Hora_Inicio).getHours();
     
      this.factura.Monto_Subtotal =   this.factura.Precio_Hora * this.factura.Total_Horas; 

      this.factura.Monto_Total =   this.factura.Monto_Subtotal + this.factura.Precio_Luz;
      this.factura.Monto_FP =     this.factura.Monto_Total* this.factura.Porcentaje_FP / 100;
      this.factura.Monto_Total = this.factura.Monto_Total - this.factura.Monto_FP ;

      if( this.factura.Impuesto > 0){
        this.factura.Monto_Total =   (this.factura.Monto_Total *  this.factura.Impuesto) / 100; 

      }
      if( this.factura.Descuento > 0){
        this.factura.Monto_Descuento =   (   this.factura.Monto_FP *  this.factura.Descuento) / 100; 
        
        

      }
      this.factura.Monto_Equipo =  this.factura.Monto_Total / 2;

        console.log('factura post', this.factura)
  this.faturacionService.syncFacturaPost(this.factura).then(factura =>{

    console.log('factura post completed', factura)

    this.factura ={
      ID : null,
      Cod_Reservacion  : null,
      Cod_Pago_Retador : "",
      Porcentaje_FP : 10,
      Monto_FP :0,
      Cod_Descuento : 'FREE',
      Cod_Pago_Rival :  "",
      Impuesto  :  0,
      Luz: null,
      Monto_Impuesto   :  0,
      Descuento  : 100,
      Monto_Descuento  : 0,
      Total_Horas:0,
      Precio_Hora   :  0,
      Precio_Luz   :  0,
      Monto_Subtotal  : 0,
      Monto_Total  : 0,
      Monto_Equipo  : 0,
      Monto_Abonado_Retador   :  0,
      Monto_Abonado_Rival    :  0,
      Monto_Pendiente_Retador   : 0,
      Monto_Pendiente_Rival   : 0,
      Estado   : true,
      Notas_Estado    :  ""
   }

  }, error =>{
    console.log('factura post error', error)
  })
      this.gestionReservacionesService.insertarReservacion(cofirmacion);
  
      }
    })
    
    
    this.cerrarModal();
    
    
    }


    // MODALES


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
       
           if(data.equipo !== undefined){
           
            this.rival = data.equipo;
  
               this.modalCtrl.dismiss();

               if(this.cancha != null && this.cancha != undefined){
                this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
                this.horarioCancha();
              }
 
              
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

               if(this.cancha != null && this.cancha != undefined){
                this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
                this.horarioCancha();
              }
               
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
   
       if(data.cancha !== undefined){
       
        this.cancha = data.cancha;
        this.nuevaReservacion.Cod_Cancha = this.cancha.Cod_Cancha;
        this.horarioCancha();

           this.modalCtrl.dismiss();
       }
}



     cerrarModal(){

       this.modalCtrl.dismiss();
  
     }



    // FUNCIONES DEL CALENDATIOS


    slideNext() {

      this.myCal.slideNext();

    }
    


    slidePrev() {

    this.myCal.slidePrev();

    }

    onViewTitleChanged(title){

      this.viewTitle = title;

    }

    
  async alertaReservacion() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      subHeader:'Proceso De Reservación',
      message:'¿Desea  generar la reservación?',
      
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
  
            console.log(this.nuevaReservacion, 'reservacion')


          }
        },
        {
          text: 'Continuar',
          role: 'confirm',
          handler: () => {
            alert.dismiss();
            console.log(this.nuevaReservacion, 'reservacion')

          this.generarReto();
          this.notificarUsuarios();      
          
          

           }
        }
      ]
    });
  
    await alert.present();

    const { role } = await alert.onDidDismiss();
  
  }


  notificarUsuarios(){

    let subject =  ' Nueva Reservación ' +  this.nuevaReservacion.Titulo;
    let body = 'Estimado usuario, ha recibido una solicitud para nueva reservación, puedes encontrar mas detalles en la bandeja de retos de la aplicación FUTPLAY';
    this.emailService.notificarUsuarios(this.rival.Cod_Usuario, subject, body).then(resp =>{


      console.log('email 1', resp)
      this.emailService.notificarUsuarios(this.retador.Cod_Usuario, subject, body).then(resp =>{
        console.log('email 2', resp)
      });

      

    });


  }

    onCurrentDateChanged(selectedDate:Date) {

      this.gestionReservacionesService.horaInicioArray = [];
      this.gestionReservacionesService.horaFinArray = [];
      this.nuevaReservacion.Hora_Inicio = null;
      this.nuevaReservacion.Hora_Fin = null;
      this.Hora_Inicio = null;
      this.Hora_Fin = null;
      this.nuevaReservacion.Fecha =   selectedDate;
      this.diaActual();
    

      if(!this.gestionReservacionesService.horario[selectedDate.getDay()].Estado) {
        this.add = false;
        this.alertasService.message('FUTPLAY', 'Lo sentimos la cancha se encuentra cerrada.')
                return;
              }
  var today = new Date();

  if (selectedDate.getFullYear() >= today.getFullYear()   &&   selectedDate.getMonth() >= today.getMonth()) {

    if(selectedDate.getMonth() >  today.getMonth() ){

      this.add = true;

    }else if (selectedDate.getMonth() == today.getMonth() && selectedDate.getDate() >= today.getDate()){

      this.add = true;

    }else{
      this.add = false;
      this.alertasService.message('FUTPLAY','No se pueden reservar fechas previas.');  
      return;       
    }
    } else {

      this.add = false;
      this.alertasService.message('FUTPLAY','No se pueden reservar fechas previas.');
      return;       
  }

    

      let dateToUse: Date = null;
      let start: number = null;
      if(selectedDate.getDate() === new Date().getDate()){
      
        dateToUse = new Date();
        start = dateToUse.getHours() + 1;
      }else{
      
        dateToUse =  selectedDate;
        start = this.gestionReservacionesService.horario[selectedDate.getDay()].Hora_Inicio;

      }


      
      this.gestionReservacionesService.syncreservacionesFiltrarFecha(this.cancha.Cod_Cancha ,this.gestionReservacionesService.formatoFecha(selectedDate,'-')).then(resp =>{
   console.log('selectedday', selectedDate)
   console.log('start', start)
        this.gestionReservacionesService.cancularHora( selectedDate,start).then(horas =>{
          console.log('horas', horas)
        
if(horas == undefined ){
  this.add = false;
  
            this.alertasService.message('FUTPLAY', 'Lo sentimos por el dia de hoy no se pueden hacer mas reservaciones..')
  return;

}
this.gestionReservacionesService.horaInicioArray = horas.splice(0, horas.length - 1);
          if(this.gestionReservacionesService.horaInicioArray.length == 0){
            this.add = false;
            this.alertasService.message('FUTPLAY', 'Lo sentimos por el dia de hoy no se pueden hacer mas reservaciones..')
  
            return;
          }
          for( let j = 0; j < resp.length; j++){
              
            let index  = this.gestionReservacionesService.horaInicioArray.findIndex (h => h.hours ==  new Date(resp[j]['Hora_Inicio']).getHours());
          
            if(index >=0){
              this.gestionReservacionesService.horaInicioArray.splice(index,1);
          
            }
          
             }
          
              
                
                  })






          });

  
  }


   


}
