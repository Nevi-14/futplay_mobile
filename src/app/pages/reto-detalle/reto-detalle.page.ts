import { Component, Input, OnInit } from '@angular/core';
import { Retos } from '../../models/retos';
import { RetosService } from '../../services/retos.service';
import { ClubService } from '../../services/club.service';
import { Club } from '../../models/club';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reto-detalle',
  templateUrl: './reto-detalle.page.html',
  styleUrls: ['./reto-detalle.page.scss'],
})
export class RetoDetallePage implements OnInit {
@Input() reto: Retos;
@Input() club: Club;
  constructor(public retos: RetosService, public clubes: ClubService, public usuario: UserService) { }

  ngOnInit() {
console.log(this.club)
    const i = this.clubes.club.findIndex(c => c.clubID == this.reto.clubID1);
   this.club =  this.clubes.club[i];
  }

}
