import { Component, OnInit } from '@angular/core';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-retos-enviados',
  templateUrl: './retos-enviados.page.html',
  styleUrls: ['./retos-enviados.page.scss'],
})
export class RetosEnviadosPage implements OnInit {
  reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService


  ) { }

  ngOnInit() {
    this.reservacionesService.syncgGtReservacionesEnviadas(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
this.reservaciones = reservaciones;
    })
  }

}
