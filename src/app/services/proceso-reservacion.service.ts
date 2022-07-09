import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HorarioCanchas } from '../models/horarioCanchas';
import { ReservacionesCanchasUsuarios } from '../models/Reservaciones_Canchas_Usuarios';
import { GenerarReservacionPage } from '../pages/generar-reservacion/generar-reservacion.page';
import { GestionReservacionesService } from './gestion-reservaciones.service';
import { HorarioCanchasService } from './horario-canchas.service';
import { LogicaReservacionService } from './logica-reservacion.service';
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

@Injectable({
  providedIn: 'root'
})
export class ProcesoReservacionService {

  horasInicio: objetoFecha[] =[]
  Hora_Inicio: any;
  Hora_Fin: any;
  horario:HorarioCanchas[];
  dia:HorarioCanchas;
  reservaciones:ReservacionesCanchasUsuarios[];
  valor = '';
  dateValue2 = null
  fecha = new Date()
  timeModified = false;
  diaCompleto:boolean;

constructor(
public gestionReservacionesService: GestionReservacionesService,
public horarioCanchasService: HorarioCanchasService,
public logicaReservacionesService: LogicaReservacionService,
public modalCtrl: ModalController


  ) { }


  convertDate(dateValue) {
    var date = new Date(dateValue);
    let day =  date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
  
    return   year+'-'+month+'-'+day;
  
   
  }
  

async gerarReservacion(Cod_Cancha, Fecha){
// VALIDAMOS DIA COMPLETO : CARGAMOS RESERVACIONES DEL DIA Y SI ES  == 0 ENTONCES SE ACTIVA DIA COMPLETO Y SI ES 1 SE COMPARA PARA VER SI ES EL MISMO Y EN CASO DE SER EL MISMO SE VALIDA. A LA HORA DE EFECTUAR LA ACTUALIZACION SE VIUELVE A EFECTUAR ESTE PROCESO

  this.gestionReservacionesService.syncFiltrarReservacionesFecha(Cod_Cancha,this.convertDate(Fecha),this.convertDate(Fecha)).then(resp =>{

  this.reservaciones = resp;
  if(this.reservaciones.length  == 0){
this.diaCompleto = true;
  }else{
    this.diaCompleto = false;

  }
    
  })
  this.horarioCanchasService.syncHorarioCanchasPromise(Cod_Cancha).then(resp =>{

    this.horario = resp;

     let index = new Date(Fecha).getDay();
     this.dia =  this.horario[index];
     let apertura = this.horario[index].Hora_Inicio;
     let cierre = this.horario[index].Hora_Fin;


    this.logicaReservacionesService.generarArregloHorasDisponibles(apertura, cierre,new Date(Fecha)).then(resp =>{
         
            this.logicaReservacionesService.horaInicioArray = resp;
            console.log('horario', this.horario)
            console.log('horarioDia',this.dia)
            console.log('this.reservaciones', this.reservaciones)
            console.log('this.horas',     this.logicaReservacionesService.horaInicioArray)
            this.generarReservacion(new Date(Fecha));
      
          });
  }); 

  

}


async editargerarReservacion(Cod_Cancha, Cod_Reservacion,  Fecha_Inicio, Fecha_Fin){
  // VALIDAMOS DIA COMPLETO : CARGAMOS RESERVACIONES DEL DIA Y SI ES  == 0 ENTONCES SE ACTIVA DIA COMPLETO Y SI ES 1 SE COMPARA PARA VER SI ES EL MISMO Y EN CASO DE SER EL MISMO SE VALIDA. A LA HORA DE EFECTUAR LA ACTUALIZACION SE VIUELVE A EFECTUAR ESTE PROCESO
  
    this.gestionReservacionesService.syncFiltrarReservacionesFecha(Cod_Cancha,this.convertDate(Fecha_Inicio),this.convertDate(Fecha_Fin )).then(resp =>{
  
    this.reservaciones = resp;
  
    if(this.reservaciones.length  == 0){
  this.diaCompleto = true;
    }else if (this.reservaciones.length == 1){
    if(this.reservaciones[0].Cod_Reservacion == Cod_Reservacion){
      this.diaCompleto = true;
    }else{
      this.diaCompleto = false;
    }
    }else{
      this.diaCompleto = false;
  
    }
  
  
      
    })
    this.horarioCanchasService.syncHorarioCanchasPromise(Cod_Cancha).then(resp =>{
  
      this.horario = resp;
  
      let index = new Date(Fecha_Inicio).getDay();
      this.dia =  this.horario[index];
    let apertura = this.horario[index].Hora_Inicio;
    let cierre = this.horario[index].Hora_Fin;
  
  
      this.logicaReservacionesService.generarArregloHorasDisponibles(apertura, cierre,new Date(Fecha_Inicio)).then(resp =>{
     
        
              this.logicaReservacionesService.horaInicioArray = resp;
              console.log('horario', this.horario)
  
              console.log('horarioDia',this.dia)
  
              console.log('this.reservaciones', this.reservaciones)
              console.log('this.horas',     this.logicaReservacionesService.horaInicioArray)
  
              this.generarReservacion(new Date(Fecha_Inicio));
        
            });
    }); 
  
    
  
  }
  




async    generarReservacion(Fecha){
  const modal = await this.modalCtrl.create({
    component: GenerarReservacionPage,
    componentProps:{
      fecha:Fecha
    },
    cssClass: 'horario-modal',
    mode:'ios'
  });
  return await modal.present();
}





}
