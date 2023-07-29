import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-fecha',
  templateUrl: './seleccionar-fecha.page.html',
  styleUrls: ['./seleccionar-fecha.page.scss'],
})
export class SeleccionarFechaPage {
  @Input() title: string;
  @Input() id: string
  @Input() fecha: Date
  @ViewChild('fFecha') fFecha: NgForm
  today: Date = new Date();
  dateObjectReturn = {
    date: null,
    month: null,
    year: null
  }
  meses = [{ id: "Enero", valor: "Enero" }, { id: "Febrero", valor: "Febrero" }, { id: "Marzo", valor: "Marzo" }, { id: "Abril", valor: "Abril" }, { id: "Mayo", valor: "Mayo" }, { id: "Junio", valor: "Junio" }, { id: "Julio", valor: "Julio" }, { id: "Agosto", valor: "Agosto" }, { id: "Septiembre", valor: "Septiembre" }, { id: "Octubre", valor: "Octubre" }, { id: "Noviembre", valor: "Noviembre" }, { id: "Diciembre", valor: "Diciembre" }];
  dias = []
  anos = []

  constructor(
    public modalCtrl: ModalController,
    public cd: ChangeDetectorRef
  ) { }
  ionViewWillEnter() {
    if (this.fecha) {
      this.today = this.fecha;
    }
    this.dateObjectReturn.date = this.today.getDate();
    this.dateObjectReturn.month = this.capitalizeFirstLetter(this.today.toLocaleString('es-ES', { month: 'long' }))
    this.dateObjectReturn.year = this.today.getFullYear();
    this.cd.detectChanges();
    this.populateYears();
  }

  capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }
  regresar() {
    this.modalCtrl.dismiss();
  }
  obtenerAno(fFecha: NgForm, event?) {
    let fecha = fFecha.value;
    if (fecha.ano) {

      this.dateObjectReturn.year = new Date().getFullYear();
    } else {
      this.dateObjectReturn.year = this.dateObjectReturn.year;
    }
    this.dateObjectReturn.date = this.today.getDate();
    this.cd.detectChanges();
    this.populateDays(null);

  }
  obtenerMes(fFecha: NgForm, event?) {
    this.populateDays(fFecha, event);

  }

  populateDays(fFecha: NgForm, event?) {
 //alert(fFecha.value)
    console.log('fFecha', fFecha)
    this.dias = [];
    let monthValue = fFecha.value.mes ? fFecha.value.mes : this.dateObjectReturn.month;
    let year = fFecha.value.ano ? fFecha.value.ano : this.dateObjectReturn.year;
    this.dateObjectReturn.date = this.today.getDate();
    let numeroDias = 0;
    if (monthValue === 'Enero' || monthValue === 'Mayo' || monthValue === 'Marzo' || monthValue === 'Julio' || monthValue === 'Agosto' || monthValue === 'Octubre' || monthValue === 'Diciembre') {
      numeroDias = 31;
    } else if (monthValue === 'Abril' || monthValue === 'Junio' || monthValue === 'Septiembre' || monthValue === 'Noviembre') {
      numeroDias = 30;
    }
    // CHECK FOR A LEAP YEAR     
    const leap = new Date(year, 2, 0).getDate() === 29;

    if (leap) {
      if (monthValue === 'Febrero') {
        numeroDias = 28;
      }

    } else {
      if (monthValue === 'Febrero') {
        numeroDias = 29;
      }

    }
    for (let i = 1; i <= numeroDias; i++) {

      this.dias.push(
        { id: String(i), valor: i }
      );

      if (i == numeroDias - 1) {
        this.cd.detectChanges();
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
        id: String(ano - i),
        valor: ano - i
      });
      if (i == 101 - 1) {

        this.obtenerMes(this.fFecha);
      }
    }
  }
  obtenerDia(fFecha: NgForm, event?) {
    let fecha = fFecha.value;
    if (fecha.dia) {
      this.dateObjectReturn.date = fecha.dia;
    } else {
      this.dateObjectReturn.date = this.dateObjectReturn.date;
    }
  }
  getMonthDays(fFecha: NgForm, MonthYear, day) {
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
    var month = (this.meses.findIndex(e => e.id == fecha.mes) + 1);
    return new Date(fecha.ano, month, fecha.dia);
  }
  seleccionarFecha(fFecha: NgForm) {
    let fecha = fFecha.value;
    let day = this.dateObjectReturn.date;
    let month = this.dateObjectReturn.month;
    let year = this.dateObjectReturn.year
    console.log('this.meses.indexOf(fecha.mes)', this.meses.indexOf(fecha.mes))
    let completeDate = new Date(fecha.ano, this.meses.findIndex(e => e.id == fecha.mes), fecha.dia)
    console.log('completeDate', completeDate)
    this.modalCtrl.dismiss({
      'date': completeDate
    });
  }

}
