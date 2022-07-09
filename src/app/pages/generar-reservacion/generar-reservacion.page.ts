import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { ListaCanchas } from 'src/app/models/listaCanchas';
import { vistaEquipos } from 'src/app/models/vistaEquipos';
import { AlertasService } from 'src/app/services/alertas.service';
import { ConfirmacionReservacionesService } from 'src/app/services/confirmacion-reservaciones.service';
import { GenerarReservacionService } from 'src/app/services/generar-reservacion.service';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { ProcesoReservacionService } from 'src/app/services/proceso-reservacion.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ListaCanchasPage } from '../lista-canchas/lista-canchas.page';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { CalendarComponent } from 'ionic2-calendar';
import { format } from 'date-fns';
import { ConfiguracionHorarioService } from 'src/app/services/configuracion-horario.service';
import { GestionReservacionesService } from '../../services/gestion-reservaciones.service';
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
})
export class GenerarReservacionPage implements OnInit {

  //
  show  = false;;
  viewTitle: string
  calendarMode: any = 'month'

  calendar = {
    mode: this.calendarMode,
    currentDate: new Date()
  }

  dateValue = format(new Date(), 'yyyy-MM-dd'); 

  selectedDay =  new Date();

  lockSwipes = false;

  currentDate = new Date();

  @ViewChild(CalendarComponent) myCal: CalendarComponent;



  //
  @Input()rival : vistaEquipos;
  @Input()retador : vistaEquipos;
  @Input()cancha : ListaCanchas;
  selectedDate: Date = new Date();
  soccer= 'assets/icon/soccer.svg';
  fechaDateTime =  new Date()
  dateValue2 = null;
  horarios: HorarioCanchas[]=[];
  horario: HorarioCanchas;
  Hora_Inicio: any;
  Hora_Fin: any;
  add = true;

    constructor(
      public modalCtrl: ModalController,
      public usuariosService: UsuariosService,
      public reservacionesService: ReservacionesService,
      public http: HttpClient,
      public alertasService: AlertasService,
      public generrReservacionService: GenerarReservacionService,
      public confirmarReservacionesService:ConfirmacionReservacionesService,
      private cd: ChangeDetectorRef,
      public horarioCanchasService: HorarioCanchasService,
      public popOverCtrl:PopoverController,
      public procesoReservacionService: ProcesoReservacionService,
      public configuracionHorarioService: ConfiguracionHorarioService,
      public gestionReservacionesService: GestionReservacionesService
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
if(this.cancha != null && this.cancha != undefined){
  this.nuevaReservacion.Cod_Cancha =  this.cancha.Cod_Cancha
  this.horarioCanchasService.syncHorarioCanchasPromise(this.cancha.Cod_Cancha).then((resp:any) =>{
  this.configuracionHorarioService.horarioCancha = resp;
  this.gestionReservacionesService.calHoraInicio(this.cancha.Cod_Cancha,this.selectedDate)
  console.log('rival',this.rival)
  console.log('retador',this.retador)
  console.log('cancha',this.cancha)


  })
}
 
  
    }
    

  

  

// FUNCIONES GENERALES
  
  
 horaInicio($event){
  const value:objetoFecha = $event.detail.value;
  this.nuevaReservacion.Hora_Inicio = value.date;
  this.Hora_Inicio = value;
  this.Hora_Fin = null;
  this.nuevaReservacion.Hora_Fin = null;
  this.gestionReservacionesService.horaFinArray = [];
  this.cd.markForCheck();
  this.cd.detectChanges();


  this.gestionReservacionesService.calHoraFin(this.cancha.Cod_Cancha,value);
}


horaFin($event){
  const value:objetoFecha = $event.detail.value;
  console.log('hora fin', value)
  this.Hora_Fin = value;
  this.nuevaReservacion.Hora_Fin = value.date;

  console.log('rser', this.nuevaReservacion)
  this.cd.markForCheck();
  this.cd.detectChanges();

}
  



    generarReto(){
      this.nuevaReservacion.Titulo = this.rival.Nombre + ' VS ' + this.retador.Nombre;
      this.nuevaReservacion.Fecha =  this.nuevaReservacion.Fecha.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Fecha.toTimeString().split(' ')[0];
      this.nuevaReservacion.Hora_Inicio = this.nuevaReservacion.Hora_Inicio.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Inicio.toTimeString().split(' ')[0];
      this.nuevaReservacion.Hora_Fin = this.nuevaReservacion.Hora_Fin.toISOString().split('T')[0]+' '+ this.nuevaReservacion.Hora_Fin.toTimeString().split(' ')[0];
 /**
  * 
      this.nuevaReservacion.Hora_Inicio = this.Hora_Inicio;
      this.nuevaReservacion.Hora_Fin = this.Hora_Fin;
  */

console.log(this.nuevaReservacion, 'nueva reservacion')

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

    onCurrentDateChanged(selectedDate) {

      this.nuevaReservacion.Hora_Inicio = null;
      this.nuevaReservacion.Hora_Fin = null;
      this.nuevaReservacion.Fecha = selectedDate
      this.cd.markForCheck();
      this.cd.detectChanges();

      this.gestionReservacionesService.compararFechas(this.nuevaReservacion.Fecha, new Date()).then(resp =>{
        
      if (resp === -1){
     
         this.add = false;

            }else{

          this.add = true;
        }

      })
        this.generrReservacionService.syncHorarioCanchas( this.cancha.Cod_Cancha).then(resp =>{

        this.gestionReservacionesService.horario = resp;
        this.Hora_Inicio = null;
        this.Hora_Fin = null;

        this.gestionReservacionesService.calHoraInicio2( this.nuevaReservacion.Fecha);

      })
  
  }


   


}
