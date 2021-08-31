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
   year =  new Date().getFullYear();
   month = new Date().getMonth()+1;
   daysOfTheWeek = 0;

 table = '';
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

console.log(this.year,this.month);
    this.createCalendar( this.year, this.month);
  }
  
  nextMonth(){
 console.log(typeof(this.month), this.month)
    if(this.month == 11){
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
    if(this.month == 0){
      this.year --;
      this.month = 11;
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
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);


    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4

    this.table = '';
    this.table = '<table><tr><th>L</th><th>K</th><th>M</th><th>J</th><th>V</th><th>S</th><th>D</th></tr><tr>';


    for (let i = 0; i < this.getDay(d); i++) {
     
      this.table += '<td></td>';
      console.log(i++);
      //console.log(this.getDay(d));
    }

         // <td> with actual dates
         while (d.getMonth() == mon) {
          this.daysOfTheWeek = d.getDate();
          this. monthlyTotalDays = Array(d.getDate());
          this.table += '<td>' + d.getDate() + '</td>';
  
          if (this.getDay(d) % 7 == 6) { // sunday, last day of week - newline
            this.table += '</tr><tr>';
          }
  
          d.setDate(d.getDate() + 1);
        }

              // add spaces after last days of month for the last row
      // 29 30 31 * * * *
      if (this.getDay(d) != 0) {
        for (let i = this.getDay(d); i < 7; i++) {
          this.table += '<td></td>';
        }
  
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
