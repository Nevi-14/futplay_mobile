import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  calendar = '../assets/reservations/calendar.svg';
  message = '../assets/reservations/message.svg';
  location = '../assets/reservations/location.svg';
  constructor() { }

  ngOnInit() {
  }

}
