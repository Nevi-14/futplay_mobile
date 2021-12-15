import { Component, OnInit } from '@angular/core';
import { EquiposService } from 'src/app/services/equipos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public clubs: EquiposService) { }

  ngOnInit( ) {

  }

}
