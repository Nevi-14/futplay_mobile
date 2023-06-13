import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-retos-confirmados',
  templateUrl: './retos-confirmados.page.html',
  styleUrls: ['./retos-confirmados.page.scss'],
})
export class RetosConfirmadosPage implements OnInit {

  reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService


  ) { }

  ngOnInit() {
    this.reservacionesService.syncgGtReservacionesConfirmadas(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
this.reservaciones = reservaciones;
    })
  }

}
