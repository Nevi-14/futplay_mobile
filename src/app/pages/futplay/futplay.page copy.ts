import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ReservacionesService } from 'src/app/services/reservaciones.service';

@Component({
  selector: 'app-futplay',
  templateUrl: './futplay.page.html',
  styleUrls: ['./futplay.page.scss'],
})
 
export class FutplayPage  {
  segment = 'football';
  constructor(
    public router:Router,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,

  ) { }
 
ionViewWillEnter(){
  this.segment = 'football';
}
redirigir(url:string, pagina:string){
  this.alertasService.pagina = pagina;
this.router.navigateByUrl(url, {replaceUrl:true})
}
}