import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-futplay',
  templateUrl: './futplay.page.html',
  styleUrls: ['./futplay.page.scss'],
})
export class FutplayPage implements OnInit {
  constructor(
    public router:Router,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,

  ) { }

  ngOnInit() {
this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosService.usuarioActual.usuario.Cod_Usuario).then(reservaciones =>{
  console.log('reservaciones receibidas',reservaciones)
  if(reservaciones.length > 0){
    this.reservacionesService.reservacionesRecibidas = reservaciones;
  }
 
})
  }
redirigir(url:string){
this.router.navigateByUrl(url, {replaceUrl:true})
}
}