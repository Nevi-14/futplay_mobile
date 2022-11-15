import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HorarioCanchas } from '../models/horarioCanchas';
import { ModalController } from '@ionic/angular';
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
export class HorarioCanchasService {
  horarios:HorarioCanchas[] =[];

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
  constructor(private http: HttpClient, public modalCtrl: ModalController, public alertasService: AlertasService) { }

  getURL( api: string){
    let test: string = ''
    if ( !environment.prdMode ) {
      test = environment.TestURL;
    }

    const URL = environment.preURL  + test +  environment.postURL + api 

    return URL;
  }






    // POST HORARIO CANCHA

    private postHorarioCancha (horario, Cod_Cancha){
      let URL = this.getURL( environment.postHorarioCanchaURL );
      URL = URL + Cod_Cancha;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };

      console.log('POST URL', URL, 'Horario', horario)
     
      return this.http.post( URL, JSON.stringify(horario), options );
    }
  
    syncPostHorarioCanchaToPromise(horario, Cod_Cancha){

      
 return   this.postHorarioCancha(horario , Cod_Cancha).toPromise();

    }

    private putHorarioCancha (horario, Cod_Cancha){
      let URL = this.getURL( environment.putHorarioCanchaURL );
      URL = URL + Cod_Cancha;
      const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      };

      console.log('POST URL', URL, 'Horario', horario)
     
      return this.http.put( URL, JSON.stringify(horario), options );
    }
  
    syncPutHorarioCanchaToPromise(horario, Cod_Cancha){

      
 return   this.putHorarioCancha(horario , Cod_Cancha).toPromise();

    }
    private getHorarioCancha(Cod_Cancha ){

      let URL = this.getURL( environment.getHorarioCanchaURL);
           URL = URL + Cod_Cancha;
  console.log('getHorarioCancha',URL)
      return this.http.get<HorarioCanchas[]>( URL );
  
    }

syncGetHorarioCanchaToPromise(Cod_Cancha){

  return this.getHorarioCancha(Cod_Cancha).toPromise();


}
















    insertarHorario(Cod_Cancha?){
      
      for(let i =0; i <= 6; i++){

       let dia =  {Cod_Horario:null,Cod_Cancha:null, Cod_Dia:i,Estado:true,Hora_Inicio:0,Hora_Fin:23}
        this.horarioCancha.push(dia);
if(i == 6){

if(Cod_Cancha){

for( let i = 0; i < this.horarioCancha.length;i++){

  this.horarioCancha[i].Cod_Cancha = Cod_Cancha;

  if(i == this.horarioCancha.length -1){

    this.alertasService.presentaLoading('Guardando registro');

    this.postHorarioCancha(this.horarioCancha,Cod_Cancha).subscribe(
  
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
      }



     
  
    }





























    horaInicioOnChangeEvent($event,index){

      let start = $event.detail.value+1;
      this.horarioCancha[index].Hora_Fin = 23;
      this.generarArregloHorasDisponibles(start,24).then(resp =>{
  
        this.horariosConsulta[index].Hora_Fin = resp;;
        
           });
  
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

 await this.generarArregloHorasDisponibles(0,24).then(resp =>{

hora.Hora_Inicio = resp;

 this.generarArregloHorasDisponibles(1,24).then(resp =>{

  hora.Hora_Fin = resp;

  this.horariosConsulta.push(hora);

});


 });
 



      }

  };




  async generarArregloHorasDisponibles(start:number, end:number, date?:Date,){

    console.log(start,end,date,'nnnn')
   let horasArray:any[] =[];
   let dateToUse: Date = null;
  
  
  
  
  
  
   let year,month,day,hour,minutes,seconds,milliseconds = null;
   // DATA THAT DOES NOT CHANGE
   
   if(date ){
   
     if(date.getDate() === new Date().getDate()){
   
       dateToUse = new Date();
     
     }else{
     
       dateToUse = date;
     
     }
   
     year = dateToUse.getFullYear();;
     month = dateToUse.getMonth();
     day = dateToUse.getDate();
     hour = dateToUse.getHours();
     minutes = 0;
     seconds = 0;
     milliseconds = 0;
   }
   hour =  hour%12 == 0 ? 0 : hour
   let newStart =  start ? start :  hour;
   
    for (var i = start; i < end; ++i) {
      
     let element :any = null;
   let id = i;
   let hours = i;
   let time12 =   hours%12 == 0 ? 12 : hours%12;
   let meridiem =  i < 12 ? 'AM': 'PM';
   
   if(date != undefined){
      element = {
   id:id,
       year: year,
       month: month,
       day: day,
       hours: hours,
       minutes: minutes,
       seconds: seconds,
       milliseconds: milliseconds,
       time12: time12,
       meridiem: meridiem,
       date:  date ? new Date(year, month, day, hours, minutes, seconds, milliseconds) : null
     }
   }else{
      element = {
       id:id,
       hours: hours,
       time12: time12,
       meridiem: meridiem,
    
     }
   }
   
   horasArray.push(element)
   
    if(i == end -1){
   
      return horasArray;
   
   
    }
    }
    
   
  
  
  
  
  }
  














}