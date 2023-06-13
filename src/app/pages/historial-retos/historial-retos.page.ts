import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-historial-retos',
  templateUrl: './historial-retos.page.html',
  styleUrls: ['./historial-retos.page.scss'],
})
export class HistorialRetosPage implements OnInit {

  reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService


  ) { }

  ngOnInit() {
    this.reservacionesService.syncgGtReservacionesHistorial(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
this.reservaciones = reservaciones;
    })
  }

}
