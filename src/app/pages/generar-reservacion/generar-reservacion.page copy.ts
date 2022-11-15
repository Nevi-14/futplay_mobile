import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { AlertasService } from 'src/app/services/alertas.service';


import { UsuariosService } from 'src/app/services/usuarios.service';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { CalendarComponent } from 'ionic2-calendar';
import { HorarioCachaPage } from '../horario-cacha/horario-cacha.page';

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
  @Input()rival : any;
  @Input()retador : any;
  @Input()cancha : any;
  horario:any = null;
  soccer= 'assets/icon/soccer.svg';

  Hora_Inicio: any;
  Hora_Fin: any;
  add = true;
  factura:any = {
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
      public http: HttpClient,
      public alertasService: AlertasService,
      private cd: ChangeDetectorRef,
      public popOverCtrl:PopoverController,

      public alertCtrl: AlertController,
    ) { }
  retoRival : any;
  retoRetador : any;
  retoCancha : any;
  
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

}
  
diaActual(){


}

  

// FUNCIONES GENERALES
  
  
 horaInicio($event){


}

async schedule(){

  
 const modal  = await this.modalCtrl.create({
   component: HorarioCachaPage,
  cssClass: 'my-custom-class',
  componentProps:{
    cancha: this.cancha
  }
});
await modal .present();
}

horaFin($event){


}
  

    generarReto(){

 this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
console.log('reto', this.nuevaReservacion)


    
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
          
          
          

           }
        }
      ]
    });
  
    await alert.present();

    const { role } = await alert.onDidDismiss();
  
  }




    onCurrentDateChanged(selectedDate:Date) {


  
  }


   


}