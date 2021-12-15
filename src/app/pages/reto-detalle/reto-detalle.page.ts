import { Component, Input, OnInit } from '@angular/core';
import { Equipos } from 'src/app/models/equipos';
import { Reservaciones } from 'src/app/models/reservaciones';
import { EquiposService } from 'src/app/services/equipos.service';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-reto-detalle',
  templateUrl: './reto-detalle.page.html',
  styleUrls: ['./reto-detalle.page.scss'],
})
export class RetoDetallePage implements OnInit {
@Input() reto: Reservaciones;
@Input() club: Equipos;
  constructor(public retos: ReservacionesService, public clubes: EquiposService, public usuario: UsuariosService) { }

  ngOnInit() {
console.log(this.club)
    const i = this.clubes.club.findIndex(c => c.equipoID == this.reto.equipoID1);
   this.club =  this.clubes.club[i];
  }

}
