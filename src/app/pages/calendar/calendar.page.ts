import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { ModalController } from '@ionic/angular';
import { BookingPage } from '../booking/booking.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  monthlyTotalDays = Array();
  spaceTable = Array();
  calendar = Array(31);
   year =  new Date().getFullYear();
   month = new Date().getMonth()+1;
   daysOfTheWeek = Array();
   monthName = '';
   countBefore = 0;
   countAfter = 0;
   daysWeekName = [{
     id:1,
     name: 'Lunes',
     abreviation: 'L'
   },
   {
    id:2,
    name: 'Martes',
    abreviation: 'K'
  },
  {
    id:3,
    name: 'Miercoles',
    abreviation: 'M'
  },
  {
    id:4,
    name: 'Jueves',
    abreviation: 'J'
  },
  {
    id:5,
    name: 'Viernes',
    abreviation: 'V'
  },
  {
    id:6,
    name: 'Sabado',
    abreviation: 'S'
  },
  {
    id:0,
    name: 'Domingo',
    abreviation: 'D'
  }];
  monthsArray = [
    {
      id: 1,
      name: 'Enero'
    },
    {
      id: 2,
      name: 'Febrero'
    },
    {
      id: 3,
      name: 'Marzo'
    },
    {
      id: 4,
      name: 'Abril'
    },
    {
      id: 5,
      name: 'Mayo'
    },
    {
      id: 6,
      name: 'Junio'
    },
    {
      id: 7,
      name: 'Julio'
    },
    {
      id: 8,
      name: 'Agosto'
    },
    {
      id: 9,
      name: 'Septiembre'
    },
    {
      id: 10,
      name: 'Octubre'
    },
    {
      id: 11,
      name: 'Noviembre'
    },    {
      id: 12,
      name: 'Diciembre'
    }
  ] ;

 table = '';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

console.log(this.year,this.month);
    this.createCalendar( this.year, this.month);
  }
  
  nextMonth(){
 console.log(typeof(this.month), this.month)
    if(this.month == 12){
      this.year++;
      this.month = 0;
      this.createCalendar( this.year, 1);
    }else{
      this.month++;
      this.createCalendar( this.year, this.month);
    }
    console.log('next', this.month, this.year);
  }
  lastMonth(){
    console.log(typeof(this.month), this.month)
    if(this.month == 1){
      this.year --;
      this.month = 12;
      this.createCalendar( this.year, 12);
    }else{
      this.month -- ;
      this.createCalendar( this.year, this.month);
    }
    

    console.log('last', this.month, this.year);
  }

  async booking() {
    const modal = await this.modalCtrl.create({
      component: BookingPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

   
  }
 

  createCalendar( year,  month) {

    this.monthsArray.forEach(item=>{
      console.log(item , month)
   if(item.id === month){
     console.log('true')
    this.monthName = item.name;
    console.log(this.monthName)
   }else{
    console.log('false')
   }
    });
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);


    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4

    this.table = '';
    this.table = '<table><tr><th>L</th><th>K</th><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>';
    this.countBefore = 0;

    for (let i = 0; i < this.getDay(d); i++) {
      
      this.countBefore = i+1;
      this.table += '<td></td>';
    }
    //alert(  this.countBefore)
    this.daysOfTheWeek =  Array(this.countBefore);
    console.log('first for ' , this.table);
         // <td> with actual dates
         while (d.getMonth() == mon) {
    this. monthlyTotalDays = Array(d.getDate());
          this.table += '<td>' + d.getDate() + '</td>';
  
          if (this.getDay(d) % 7 == 6) { // sunday, last day of week - newline
            this.table += '</tr><tr>';
          }
  
          d.setDate(d.getDate() + 1);
        }
        console.log('while ' , this.table);
              // add spaces after last days of month for the last row
      // 29 30 31 * * * *
      this.countAfter = 0;
      if (this.getDay(d) != 0) {
        for (let i = this.getDay(d); i < 7; i++) {

          console.log('i', i , 'i++', i++,'function', this.getDay(d));
          this.countAfter += i+1;
       
          this.table += '<td></td>';
          console.log('las for', this.table);
        }
    //    alert(this.countAfter);
      this.spaceTable = Array(this.countAfter);
      //  alert(this.spaceTable);
        console.log('last ' , this.table);
      // close the table
      this.table += '</tr></table>';
 }

}

 getDay(date) { // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}
}
