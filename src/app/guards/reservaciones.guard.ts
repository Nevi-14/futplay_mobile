import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { AlertasService } from '../services/alertas.service';
import { ReservacionesService } from '../services/reservaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ReservacionesGuard implements CanLoad {

  constructor(
    public usuariosService:UsuariosService,
    public alertasService:AlertasService,
    public reservacionesService:ReservacionesService
  ){}

  canLoad() : any {
     this.reservacionesService.cargarReservaciones();
     return true;
  }
}
