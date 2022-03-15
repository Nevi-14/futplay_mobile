import { Component, OnInit } from '@angular/core';
import { ExcepcionesHorarioCanchas } from 'src/app/models/excepcionesHorario';

@Component({
  selector: 'app-configuracion-horario',
  templateUrl: './configuracion-horario.page.html',
  styleUrls: ['./configuracion-horario.page.scss'],
})
export class ConfiguracionHorarioPage implements OnInit {
  public tipos  =[{nombre:'1',valor:'general'},{nombre:'2',valor:'cumpleanos'},{nombre:'3',valor:'seguridad'}];
  public selectedType: string ='general';

// MONTHS ARE ALWAYS THE SAME
nuevaExcepcion: ExcepcionesHorarioCanchas;
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
days = [];
years = [];
selectedYear = new Date().getFullYear();
selectedMonth: string;
selectedDay:number;
previousDay:number;
hora_inicio: Date;
hora_Fin: Date;

  horas = ['06','07','08','09','10','11']
  meridiems = ['AM','PM'];
  hours = [{hour :'07', meridiem : 'AM' } ,{hour :'08', meridiem : 'AM'},{hour :'09', meridiem : 'AM'},{hour :'10', meridiem : 'AM'},{hour :'11', meridiem : 'AM'},{hour :'12', meridiem : 'AM'},{hour :'01', meridiem : 'PM'},{hour :'02', meridiem : 'PM'},{hour :'03', meridiem : 'PM'},{hour :'04', meridiem : 'PM'},{hour :'05', meridiem : 'PM'},{hour :'06', meridiem : 'PM'},{hour :'07', meridiem : 'PM'},{hour :'08', meridiem : 'PM'},{hour :'09', meridiem : 'PM'},{hour :'10', meridiem : 'PM'}];
semana = [{dia:'lunes'},{dia:'martes'},{dia:'miercoles'},{dia:'jueves'},{dia:'viernes'},{dia:'sabado'},{dia:'domingo'}]

  constructor() { }

  ngOnInit() {



        console.log(this.horas)
  }

  
  formulario(dia, hour,meridiem){

    const fecha = new Date();

    this.nuevaExcepcion.Fecha = fecha;

  const hora_inicio = this.time(new Date(fecha),hour,meridiem);
    // en caso de que sumemos una hora const houHF = Math.floor(hour) + 1;
    this.nuevaExcepcion.Hora_Inicio = hora_inicio;


   const hora_fin  =  this.time(new Date(fecha),hour,meridiem); // this.time(new Date(fecha),'0'+hora_inicio.toString(),meridiem);

   this.nuevaExcepcion.Hora_Fin = hora_fin;


console.log(hora_inicio, hora_fin, 'hora inicio', 'hora fin', this.nuevaExcepcion)
   
  }
  meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  // INGLES

  time(date,hour,meridiem){

    const dateValue = date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear() + ' ' + hour+':'+'00:00'+' '+meridiem; // '05/18/2015 03:45:28 PM'

       return new Date(dateValue);


  }





  dayonChange(selectedValue:any){
    this.previousDay =  selectedValue.detail.value;

  }

  yearonChange(selectedValue:any){
    this.popualteYears();

  }


  onSelectChange(selectedValue: any) {
  let   monthValue =  selectedValue.detail.value;

  let currentYear = this.selectedYear;


  let dayNum = 0;
  if(monthValue === 'January' || monthValue === 'March'|| monthValue === 'May' || monthValue === 'July' || monthValue === 'August' || monthValue === 'October' || monthValue === 'December'){
    dayNum = 31;
  }else if( monthValue === 'April' || monthValue === 'June' || monthValue === 'September' || monthValue === 'November'){
    dayNum = 30;
  }else{

  // CHECK FOR A LEAP YEAR

  if(new Date(currentYear, 1, 29 ).getMonth()===1){
    dayNum = 29;
  }else{
    dayNum = 28;
  }

  }

 //  INSERT THE CORRECT DAY INTO the dropdown
 this.days = [];

 for ( let i = 1; i <= dayNum; i++){

  this.days.push(i);

 }
 this.popualteYears();

  }


  popualteYears(){

    this.years = [];

    // GET THE CURRENT YEAR AS A NUMBER
    let year = this.selectedYear;
    // make the previous 100 yars be an option
    for(let i = 0; i < 101 ; i++){

      this.years.push(year-i);
      

    }
    if(this.previousDay){

    }

  }

}
