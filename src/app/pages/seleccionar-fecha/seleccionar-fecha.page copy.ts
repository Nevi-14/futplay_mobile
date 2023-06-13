import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.page.html',
  styleUrls: ['./seleccionar-fecha.page.scss'],
})
export class SeleccionarFechaPage implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() id: string
  @Input() fecha: Date
 @ViewChild('fFecha') fFecha:NgForm
  today: Date = new Date();
  dateObjectReturn = {
    date: new Date().getDate(),
    month: this.capitalizeFirstLetter(this.today.toLocaleString('es-ES', { month: 'long' })),
    year: new Date().getFullYear()
  }
  meses = [{id:"Enero", valor:"Enero"},{id:"Febrero", valor:"Febrero"}, {id:"Marzo",valor:"Marzo"}, {id:"Abril",valor:"Abril"},{ id:"Mayo", valor:"Mayo"}, {id:"Junio", valor:"Junio"}, {id:"Julio",valor:"Julio"}, {id:"Agosto",valor:"Agosto"}, {id:"Septiembre",valor:"Septiembre"}, {id:"Octubre",valor:"Octubre"}, {id:"Noviembre",valor:"Noviembre"}, {id:"Diciembre",valor:"Diciembre"}];
  dias = []
  anos = []


  capitalizeFirstLetter(str) {


    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  constructor(
    public modalCtrl: ModalController,
    public cd:ChangeDetectorRef
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {

    if (this.fecha) {
      console.log('fecha', this.fecha.getDate())

      this.today = this.fecha;
    } else {
      console.log('date else', this.today)
      let day = this.today.getDate();
      let year = this.today.getFullYear();
      let monthName = this.capitalizeFirstLetter(this.today.toLocaleString('es-ES', { month: 'long' }))
      this.dateObjectReturn = {
        date: day,
        month: monthName,
        year: year

      }

    }

    this.populateYears();

  }


  obtenerAno(fFecha:NgForm,event?) {
    let fecha = fFecha.value;
    if (fecha.ano) {
 
      this.dateObjectReturn.year = new Date().getFullYear();
    } else {
      this.dateObjectReturn.year = this.dateObjectReturn.year;
    }
    this.obtenerMes(null);

  }
  obtenerMes(fFecha:NgForm,event?) {
    console.log(fFecha, 'fff')
    let fecha = fFecha.value;
    if (fecha.mes) {
   
    //  this.dateObjectReturn.month = fecha.mes;
    } else {
      //this.dateObjectReturn.month = this.dateObjectReturn.month;
    }
    this.populateDays(fFecha,event);

  }
 
  populateDays(fFecha:NgForm,event?) {
    console.log('fFecha',this.fFecha)
    let fecha = this.fFecha.value;
  
    this.dias = [];
    let monthValue =  this.dateObjectReturn.month;
    let numeroDias = 0;
alert(monthValue)
    if (monthValue === 'Enero' || monthValue === 'Mayo' || monthValue === 'Marzo' || monthValue === 'Julio' || monthValue === 'Agosto' || monthValue === 'Octubre' || monthValue === 'Diciembre') {
      numeroDias = 31;
    } else if (monthValue === 'Abril' || monthValue === 'Junio' || monthValue === 'Septiembre' || monthValue === 'Noviembre') {
      numeroDias = 30;
    }

    // CHECK FOR A LEAP YEAR     
    const leap = new Date(this.dateObjectReturn.year, 2, 0).getDate() === 29;

    if (leap) {
      if (monthValue === 'Febrero') {
        numeroDias = 28;
      }

    } else {
      if (monthValue === 'Febrero') {
        numeroDias = 29;
      }

    }

    this.dias = [];

    for (let i = 1; i <= numeroDias; i++) {
 
      this.dias.push(
        {id:i, valor:i}
      );

     
      if (i == numeroDias - 1) {
        let dia = this.dias.findIndex(dia => dia.id == this.dateObjectReturn.date);

        if (dia >= 0) {
          this.dateObjectReturn.date = this.dias[dia].id
        } else {
          this.dateObjectReturn.date = this.dias[0].id;
        }

      }

    }



  }



  cerrarModal() {
    this.modalCtrl.dismiss(this.modalCtrl.dismiss({
      'date': null
    }, null, this.id));
  }



  populateYears() {

    this.anos = [];

    // GET THE CURRENT YEAR AS A NUMBER
    let ano = this.today.getFullYear();
    // make the previous 100 yars be an option
    for (let i = 0; i < 101; i++) {

      this.anos.push({
        id:ano - i,
        valor:ano - i
      });

      if (i == 101 - 1) {
      
        this.obtenerMes(this.fFecha);

      }


    }


  }
  obtenerDia(fFecha:NgForm,event?) {
    let fecha = fFecha.value;
    if (fecha.dia) {
  
      this.dateObjectReturn.date = fecha.dia;
    } else {
      this.dateObjectReturn.date = this.dateObjectReturn.date;
    }
  }
  getMonthDays(fFecha:NgForm,MonthYear, day) {
    let fecha = fFecha.value;
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    var Value = MonthYear.split(" ");
    var month =  (this.meses.findIndex( e=> e.id == fecha.mes) + 1);
    return new Date(fecha.ano, month, fecha.dia);
  }

  seleccionarFecha(fFecha:NgForm) {

    let fecha = fFecha.value;
console.log('fechaaa', fecha)
 
    let day = this.dateObjectReturn.date;
    let month = this.dateObjectReturn.month;
    let year = this.dateObjectReturn.year
    console.log('this.meses.indexOf(fecha.mes)',this.meses.indexOf(fecha.mes))
    let completeDate = new Date(fecha.ano, this.meses.findIndex( e=> e.id == fecha.mes), fecha.dia )
    console.log('completeDate',completeDate)
    this.modalCtrl.dismiss({
      'date': completeDate
    });
  }



}
