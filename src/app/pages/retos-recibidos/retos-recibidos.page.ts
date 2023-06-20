import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilReservaciones } from 'src/app/models/perfilReservaciones';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { AceptarRetoPage } from '../aceptar-reto/aceptar-reto.page';

@Component({
  selector: 'app-retos-recibidos',
  templateUrl: './retos-recibidos.page.html',
  styleUrls: ['./retos-recibidos.page.scss'],
})
export class RetosRecibidosPage implements OnInit {
reservaciones:PerfilReservaciones[]=[]
  constructor(
public reservacionesService:ReservacionesService,
public usuariosSErvice:UsuariosService,
public modalCtrl:ModalController


  ) { }

  ngOnInit() {
this.retosRecibidos()
  }
  retosRecibidos(){
    this.reservacionesService.syncgGtReservacionesRecibidas(this.usuariosSErvice.usuarioActual.usuario.Cod_Usuario).then(reservaciones=>{
      this.reservaciones = reservaciones;
          })
  }
  async detalleReto(reto:PerfilReservaciones) {

  
      const modal = await this.modalCtrl.create({
        component: AceptarRetoPage,
        cssClass: 'my-custom-class',
        componentProps: {
          reto: reto,
          aceptar:true
        }
      });
  
       await modal.present();
    let {data} = await modal.onDidDismiss();
    this.retosRecibidos();
    }
}
