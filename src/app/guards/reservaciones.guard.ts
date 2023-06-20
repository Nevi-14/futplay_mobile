import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
