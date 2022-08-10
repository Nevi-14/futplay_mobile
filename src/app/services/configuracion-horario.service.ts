import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertasService } from './alertas.service';
import { GestionReservacionesService } from './gestion-reservaciones.service';

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
public http: HttpClient,
public alertasService: AlertasService,
public gestionReservacionesService:GestionReservacionesService

  ) { }

  getURL( api: string){

    let test: string = ''

    if ( !environment.prdMode ) {

      
      test = environment.TestURL;
      
    }

    const URL = environment.preURL  + test +  environment.postURL + api

    return URL;
  }


    // POST HORARIO CANCHA

    private postHorarioCancha (horario){
      const URL = this.getURL( environment.horarioCanchaURL );
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };
     
      return this.http.post( URL, JSON.stringify(horario), options );
    }
  
    insertarHorario(Cod_Cancha?){

if(Cod_Cancha){

  for( let i = 0; i < this.horarioCancha.length;i++){
    this.horarioCancha[i].Cod_Cancha = Cod_Cancha;
    if(i == this.horarioCancha.length -1){
      this.alertasService.presentaLoading('Guardando registro');



      this.postHorarioCancha(this.horarioCancha).subscribe(

      
        resp => {

          this.alertasService.loadingDissmiss();

          console.log('horario creado', resp)


        }, error => {

          this.alertasService.loadingDissmiss();

       

         console.log('error', this.horarioCancha)
        }
      )

    }
  }
}

     
  
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




      }

  };




}
