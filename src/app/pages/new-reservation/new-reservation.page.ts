import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  styleUrls: ['./new-reservation.page.scss'],
})
export class NewReservationPage implements OnInit {
  calendar = '../assets/reservations/calendar.svg';
  message = '../assets/reservations/message.svg';
  location = '../assets/reservations/location.svg';
  constructor(public data: DataService) { }

  ngOnInit() {
  }

}
