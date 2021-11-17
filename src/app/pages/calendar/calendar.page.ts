import { Component, Input, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { ModalController } from '@ionic/angular';
import { BookingPage } from '../booking/booking.page';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
@Input() cancha: string;
  constructor(public modalCtrl: ModalController, public cal: CalendarService) { }

  async booking() {
    const modal = await this.modalCtrl.create({
      component: BookingPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  ngOnInit() {
    this.cal.createCalendar(this.cal.year, this.cal.month);
    console.log(this.cal.monthName);
  }
}
