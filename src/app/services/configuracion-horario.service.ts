import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogicaReservacionService } from './logica-reservacion.service';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
interface time {
id: number,
hours: number,
time12: number,
meridiem: string
}
interface horarios {
  Cod_Dia: number,
  Hora_Inicio:time[],
  Hora_Fin:time[],
  
}
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionHorarioService {
 // day of the week (0 to 6) of a date.
 week = [
  {Code:0, Day:'Domingo'},
  {Code:1,Day:'Lunes'},
  {Code:2,Day:'Martes'},
  {Code:3,Day:'Miercoles'},
  {Code:4,Day:'Jueves'},
  {Code:5,Day:'Viernes'},
  {Code:6,Day:'Sabado'}] 
  horarioCancha = [
    {Cod_Horario:null,Cod_Cancha:null, Cod_Dia:0,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:1,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:2,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:3,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:4,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:5,Estado:true,Hora_Inicio:0,Hora_Fin:23},
    {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:6,Estado:true,Hora_Inicio:0,Hora_Fin:23}]
    horariosConsulta: horarios[]=[];



  constructor(
public logicaReservacionService:LogicaReservacionService,
public http: HttpClient,
public alertasService: AlertasService

  ) { }

  getURL( api: string){

    let test: string = ''

    if ( !environment.prdMode ) {

      
      test = environment.TestURL;
      
    }

    const URL = environment.preURL  + test +  environment.postURL + api

    return URL;
  }

  



  diaNombre(index){
    return this.week[index].Day
  }


  async generarhorarioConsulta(){

    
    this.horarioCancha = [
      {Cod_Horario:null,Cod_Cancha:null, Cod_Dia:0,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:1,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:2,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:3,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:4,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:5,Estado:true,Hora_Inicio:0,Hora_Fin:23},
      {Cod_Horario:null,Cod_Cancha:null,Cod_Dia:6,Estado:true,Hora_Inicio:0,Hora_Fin:23}]


    for( let i = 0; i < this.horarioCancha.length;i++){
      this.horarioCancha[i].Cod_Cancha = null;
    }
    this.horariosConsulta = [];

    for(let i = 0 ; i <= 6; i++){

      let hora = {

        Cod_Dia: i,
        Hora_Inicio:[],
        Hora_Fin:[],

      }

 await this.logicaReservacionService.generarArregloHorasDisponibles(0,24).then(resp =>{

hora.Hora_Inicio = resp;

 this.logicaReservacionService.generarArregloHorasDisponibles(1,24).then(resp =>{

  hora.Hora_Fin = resp;

  this.horariosConsulta.push(hora);

});


 });
 



      }

  };

  horaInicioOnChangeEvent($event,index){

    let start = $event.detail.value+1;
    this.horarioCancha[index].Hora_Fin = 23;
    this.logicaReservacionService.generarArregloHorasDisponibles(start,24).then(resp =>{

      this.horariosConsulta[index].Hora_Fin = resp;;
      
         });

  }



}
